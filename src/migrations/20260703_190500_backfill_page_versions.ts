import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * Backfill _pages_v for pages that existed before drafts were enabled.
 * The admin list queries with draft:true, which reads from _pages_v — pages
 * without a version row are invisible in /admin/collections/pages.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    INSERT INTO \`_pages_v\` (
      \`parent_id\`,
      \`version_title\`,
      \`version_slug\`,
      \`version_sort_order\`,
      \`version_hide_in_menu\`,
      \`version_content\`,
      \`version_page_meta_header_title\`,
      \`version_page_meta_meta_description\`,
      \`version_page_meta_meta_keywords\`,
      \`version_page_meta_meta_extra\`,
      \`version_puck_data\`,
      \`version_editor_version\`,
      \`version_page_layout\`,
      \`version_is_homepage\`,
      \`version_meta_title\`,
      \`version_meta_description\`,
      \`version_meta_image_id\`,
      \`version_meta_noindex\`,
      \`version_meta_nofollow\`,
      \`version_meta_exclude_from_sitemap\`,
      \`version_conversion_tracking_is_conversion_page\`,
      \`version_conversion_tracking_conversion_type\`,
      \`version_conversion_tracking_conversion_value\`,
      \`version_parent_id\`,
      \`version_updated_at\`,
      \`version_created_at\`,
      \`version__status\`,
      \`latest\`,
      \`created_at\`,
      \`updated_at\`
    )
    SELECT
      p.\`id\`,
      p.\`title\`,
      p.\`slug\`,
      p.\`sort_order\`,
      p.\`hide_in_menu\`,
      p.\`content\`,
      p.\`page_meta_header_title\`,
      p.\`page_meta_meta_description\`,
      p.\`page_meta_meta_keywords\`,
      p.\`page_meta_meta_extra\`,
      p.\`puck_data\`,
      p.\`editor_version\`,
      p.\`page_layout\`,
      p.\`is_homepage\`,
      p.\`meta_title\`,
      p.\`meta_description\`,
      p.\`meta_image_id\`,
      p.\`meta_noindex\`,
      p.\`meta_nofollow\`,
      p.\`meta_exclude_from_sitemap\`,
      p.\`conversion_tracking_is_conversion_page\`,
      p.\`conversion_tracking_conversion_type\`,
      p.\`conversion_tracking_conversion_value\`,
      p.\`parent_id\`,
      p.\`updated_at\`,
      p.\`created_at\`,
      COALESCE(p.\`_status\`, 'published'),
      1,
      p.\`created_at\`,
      p.\`updated_at\`
    FROM \`pages\` p
    WHERE NOT EXISTS (
      SELECT 1 FROM \`_pages_v\` v
      WHERE v.\`parent_id\` = p.\`id\` AND v.\`latest\` = 1
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    DELETE FROM \`_pages_v\`
    WHERE \`id\` IN (
      SELECT v.\`id\` FROM \`_pages_v\` v
      INNER JOIN \`pages\` p ON p.\`id\` = v.\`parent_id\`
      WHERE v.\`latest\` = 1
        AND COALESCE(p.\`editor_version\`, 'legacy') = 'legacy'
        AND NOT EXISTS (
          SELECT 1 FROM \`_pages_v\` v2
          WHERE v2.\`parent_id\` = v.\`parent_id\` AND v2.\`id\` != v.\`id\`
        )
    );
  `)
}
