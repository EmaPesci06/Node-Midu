import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
const { Schema } = new DBLocal({ path: 'db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // 1. Validar los datos
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (user) throw new Error('El usuario ya existe')

    const id = crypto.randomUUID()
    const hashpassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({ _id: id, username, password: hashpassword }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })

    if (!user) throw new Error('El usuario no existe')
    const isValid = await bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('El password no es correcto')

    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('El username debe de ser un string')
    if (typeof username.length < 3) throw new Error('El username debe de como minimo a 3 caracteres')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('El password debe de ser un string')
    if (typeof password.length < 6) throw new Error('El password debe de como minimo a 6 caracteres')
  }
}
