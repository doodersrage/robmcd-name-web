import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_code_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language\` text DEFAULT 'typescript' NOT NULL,
  	\`code\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_block_order_idx\` ON \`pages_blocks_code_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_block_parent_id_idx\` ON \`pages_blocks_code_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_block_path_idx\` ON \`pages_blocks_code_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_code_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language\` text DEFAULT 'typescript' NOT NULL,
  	\`code\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_block_order_idx\` ON \`posts_blocks_code_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_block_parent_id_idx\` ON \`posts_blocks_code_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_code_block_path_idx\` ON \`posts_blocks_code_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_order_idx\` ON \`posts_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_parent_id_idx\` ON \`posts_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_path_idx\` ON \`posts_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_form_idx\` ON \`posts_blocks_form_block\` (\`form_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_code_block\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_code_block\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_form_block\`;`)
}
