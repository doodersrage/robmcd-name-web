import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/** Repair breadcrumb rows with null doc_id left by draft/version migrations. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`pages_breadcrumbs\`
    SET \`doc_id\` = \`_parent_id\`
    WHERE \`doc_id\` IS NULL AND \`_parent_id\` IS NOT NULL;
  `)
  await db.run(sql`
    UPDATE \`_pages_v_version_breadcrumbs\`
    SET \`doc_id\` = (
      SELECT \`parent_id\` FROM \`_pages_v\` WHERE \`_pages_v\`.\`id\` = \`_pages_v_version_breadcrumbs\`.\`_parent_id\`
    )
    WHERE \`doc_id\` IS NULL AND \`_parent_id\` IS NOT NULL;
  `)
  await db.run(sql`DELETE FROM \`pages_breadcrumbs\` WHERE \`doc_id\` IS NULL;`)
  await db.run(sql`DELETE FROM \`_pages_v_version_breadcrumbs\` WHERE \`doc_id\` IS NULL;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Data repair — no rollback
}
