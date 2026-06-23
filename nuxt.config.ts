// Docus enables its AI assistant automatically when Vercel injects OIDC.
// This site does not use that feature, and the extra bundle path stalls Vercel builds.
delete process.env.VERCEL_OIDC_TOKEN
const isVercelBuild = process.env.VERCEL === '1'
const transformProbe = {
  name: 'shift2modern:transform-probe',
  apply: 'build',
  transform(_code: string, id: string) {
    if (!isVercelBuild || this.environment.name !== 'client') {
      return null
    }

    transformCount += 1
    recentTransforms.push(cleanTransformId(id))
    if (recentTransforms.length > 8) {
      recentTransforms.shift()
    }

    return null
  },
}
let transformCount = 0
const recentTransforms: string[] = []
let transformProbeInterval: ReturnType<typeof setInterval> | undefined

if (isVercelBuild) {
  transformProbeInterval = setInterval(() => {
    console.log(`[vite-probe] client_transforms=${transformCount} recent=${recentTransforms.join(' | ')}`)
  }, 10000)
}

export default defineNuxtConfig({
  extends: 'docus',
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [transformProbe],
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  }
})

process.on('exit', () => {
  if (transformProbeInterval) {
    clearInterval(transformProbeInterval)
  }
})

function cleanTransformId(id: string): string {
  return id
    .replace(process.cwd(), '')
    .replace(/^\/node_modules\/\.pnpm\//, 'pnpm:')
    .replace(/\?.*$/, '')
}
