import { Router } from 'express'

import { MovieController } from '../controllers/movies.js'

export function CreateMovieRouter ({ movieModel }) {
  const moviesRouter = Router()

  const movieControler = new MovieController({ movieModel })

  moviesRouter.get('/', movieControler.getAll)
  moviesRouter.post('/', movieControler.create)

  moviesRouter.get('/:id', movieControler.getById)
  moviesRouter.delete('/:id', movieControler.delete)
  moviesRouter.patch('/:id', movieControler.update)

  return moviesRouter
}
