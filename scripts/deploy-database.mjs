#!/usr/bin/env node
/**
 * D1 maintenance at deploy time via Wrangler's direct D1 API (no preview sessions).
 *
 * Payload schema migrations are applied on production worker startup through
 * prodMigrations in payload.config.ts — the worker uses the real D1 binding.
 */
import { execSync } from 'node:child_process'

const cloudflareEnv = process.env.CLOUDFLARE_ENV
const envFlag = cloudflareEnv ? `--env=${cloudflareEnv}` : ''

function run(command) {
  execSync(command, { stdio: 'inherit', env: process.env })
}

console.log('[deploy:database] Applying wrangler D1 migrations (remote)...')
run(`pnpm wrangler d1 migrations apply D1 ${envFlag} --remote`.trim())

console.log('[deploy:database] Optimizing remote D1...')
run(`pnpm wrangler d1 execute D1 --command 'PRAGMA optimize' ${envFlag} --remote`.trim())

console.log(
  '[deploy:database] Done. New Payload migrations (payload migrate:create) apply on the next deploy when the worker starts.',
)
