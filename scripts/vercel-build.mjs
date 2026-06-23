import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'

const startedAt = Date.now()
const buildTimeoutMs = Number(process.env.SHIFT2MODERN_BUILD_TIMEOUT_MS ?? 180000)
const child = spawn('pnpm', ['exec', 'nuxt', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SHIFT2MODERN_BUILD_PROBE: '1' },
})

console.log(`[build-watch] node=${process.version} pid=${process.pid} child_pid=${child.pid ?? 'pending'}`)

const interval = setInterval(() => {
  const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000)
  const wrapperRssMb = Math.round(process.memoryUsage().rss / 1024 / 1024)
  const childRssMb = child.pid ? readRssMb(child.pid) : null
  const childRss = childRssMb === null ? 'unknown' : `${childRssMb}MB`
  console.log(`[build-watch] elapsed=${elapsedSeconds}s wrapper_rss=${wrapperRssMb}MB child_rss=${childRss} child_pid=${child.pid ?? 'exited'}`)
}, 10000)

const timeout = setTimeout(() => {
  const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000)
  console.error(`[build-watch] timeout after ${elapsedSeconds}s; stopping nuxt build`)
  child.kill('SIGTERM')
}, buildTimeoutMs)

child.on('exit', (code, signal) => {
  clearInterval(interval)
  clearTimeout(timeout)

  if (signal) {
    console.error(`[build-watch] nuxt build exited by signal ${signal}`)
    process.exit(1)
  }

  process.exit(code ?? 1)
})

function readRssMb(pid) {
  try {
    const status = readFileSync(`/proc/${pid}/status`, 'utf8')
    const match = status.match(/^VmRSS:\s+(\d+)\s+kB$/m)
    return match ? Math.round(Number(match[1]) / 1024) : null
  } catch {
    return null
  }
}
