import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {User} from '../entity/User'
import md5 from 'md5'

export class SignIn {
  username: string
  password: string
  user:User

  errors = {username: [] as string[], password: [] as string[]}

  async validate() {
    if (this.username.trim() === '') {
      this.errors.username.push(`username can't be empty`)
    }
    const connection = await getDatabaseConnection()
    const user = await connection.manager.findOne(User, {where: {username: this.username}})
    if (user) {
      if (md5(this.password) !== user.passwordDigest) {
        this.errors.password.push('incorrect password')
      }else {
        this.user=user
      }
    } else {
      this.errors.username.push('user does not exist')
    }
    return this.errors
  }

  hasErrors() {
    return !!Object.values(this.errors).find(value => value.length > 0)
  }
}