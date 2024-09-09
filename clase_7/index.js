import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.user(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token

  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (e) { }
})

app.get('/', (req, res) => {
  const { user } = req.session

  res.render('index', user)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, { expiresIn: '1h' })
    res
      .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'stric', maxAge: 3600000 })
      .send({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logged out' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session

  if (!user) return res.status(403).send('Access no authorized')

  res.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
