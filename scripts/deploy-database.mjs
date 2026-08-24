#!/usr/bin/env node
/**
 * Deploy-time D1 maintenance.
 *
 * Cloudflare Pages CI cannot start Wrangler remote preview sessions, so
 * `payload migrate` (which needs D1 bindings) is skipped in CI. Run
 * `pnpm run deploy:database` locally before deploy when you add migrations.
 */
import { execSync } from 'node:child_process'

const isCI =
  process.env.CI === 'true' ||
  process.env.CI === '1' ||
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.CF_PAGES_URL)

const cloudflareEnv = process.env.CLOUDFLARE_ENV
const envFlag = cloudflareEnv ? `--env=${cloudflareEnv}` : ''

function run(command) {
  execSync(command, { stdio: 'inherit', env: process.env })
}

if (isCI) {
  console.log(
    '[deploy:database] CI detected — skipping payload migrate (remote preview sessions are unavailable in Pages builds).',
  )
  console.log(
    '[deploy:database] Run `pnpm run deploy:database` locally before deploy when you add Payload migrations.',
  )
} else {
  run('cross-env NODE_ENV=production PAYLOAD_SECRET=ignore payload migrate')
}

run(`wrangler d1 execute D1 --command 'PRAGMA optimize' ${envFlag} --remote`.trim())
