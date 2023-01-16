import fs from 'fs'

const CONFIG_PATH = './.minee.json'

interface Config {
  entry?: string
  dest?: string
  header?: boolean
  minify?: boolean
  keepNames?: boolean
}

/**
 * Load bundling options from a local config file, swapping in defaults for missing options.
 * @returns {Config} The configuration settings for bundling.
 */
function loadConfig (): Config {
  const defaultConfig: Config = {
    entry: undefined,
    dest: undefined,
    header: true,
    minify: true,
    keepNames: false
  }

  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
    return { ...defaultConfig, ...config }
  } catch (err) {
    return defaultConfig
  }
}

export { loadConfig }
export type { Config }
