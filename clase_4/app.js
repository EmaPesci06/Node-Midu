import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'

// import fs from 'fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

const app = express()
app.disable('x-powered-by')
app.use(json())

app.use('/movies', movieRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
