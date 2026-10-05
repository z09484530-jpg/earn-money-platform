import { createServer } from 'node:http'
import { readFile, writeFile, access, mkdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const dataDir = path.join(rootDir, 'backend', 'data')
const dataFile = path.join(dataDir, 'store.json')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const defaultStore = {
  user: {
    name: 'Anna M.',
    balance: 1284.5,
    withdrawn: 640,
  },
  tasks: [
    { id: 1, title: 'Complete survey', payout: 18, time: '5 min', badge: 'Popular' },
    { id: 2, title: 'Watch product demo', payout: 12, time: '7 min', badge: 'New' },
    { id: 3, title: 'Refer a friend', payout: 25, time: '10 min', badge: 'Bonus' },
    { id: 4, title: 'App review', payout: 20, time: '8 min', badge: 'Top' },
  ],
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true })
  try {
    await access(dataFile, constants.F_OK)
  } catch {
    await writeFile(dataFile, JSON.stringify(defaultStore, null, 2), 'utf8')
  }
}

async function readStore() {
  await ensureStore()
  const raw = await readFile(dataFile, 'utf8')
  return JSON.parse(raw)
}

async function writeStore(store) {
  await ensureStore()
  await writeFile(dataFile, JSON.stringify(store, null, 2), 'utf8')
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'TaskEarn Pro API is running' })
})

app.get('/api/user', async (_req, res) => {
  const store = await readStore()
  res.json(store.user)
})

app.get('/api/tasks', async (_req, res) => {
  const store = await readStore()
  res.json(store.tasks)
})

app.post('/api/tasks/:id/complete', async (req, res) => {
  const store = await readStore()
  const task = store.tasks.find((item) => item.id === Number(req.params.id))

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  task.payout = Number((Number(task.payout) + 4).toFixed(2))
  task.badge = 'Done'
  store.user.balance = Number((Number(store.user.balance) + 4).toFixed(2))

  await writeStore(store)
  res.json({ tasks: store.tasks, user: store.user })
})

app.post('/api/withdraw', async (_req, res) => {
  const store = await readStore()
  const amount = 25

  if (Number(store.user.balance) < amount) {
    return res.status(400).json({ message: 'Insufficient balance' })
  }

  store.user.balance = Number((Number(store.user.balance) - amount).toFixed(2))
  store.user.withdrawn = Number((Number(store.user.withdrawn) + amount).toFixed(2))

  await writeStore(store)
  res.json({ user: store.user })
})

const distPath = path.join(rootDir, 'dist')
const indexPath = path.join(distPath, 'index.html')

app.use(express.static(distPath))

app.get('*', async (req, res, next) => {
  try {
    await access(indexPath, constants.F_OK)
    res.sendFile(indexPath)
  } catch {
    next()
  }
})

const server = createServer(app)

server.listen(port, '0.0.0.0', async () => {
  await ensureStore()
  console.log(`TaskEarn Pro API running at http://localhost:${port}`)
})
