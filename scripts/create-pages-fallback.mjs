import { copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const distUrl = new URL('../dist/', import.meta.url)
await copyFile(new URL('index.html', distUrl), new URL('404.html', distUrl))
