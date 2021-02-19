import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'


const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }
  const trimName = username.trim()
  const connection = await getDatabaseConnection()
  const duplicated = await connection.manager.findOne(User, {username})
  if (duplicated){
    errors.username.push('username has been token,please try to use another name')
  }
  if (trimName === '') {
    errors.username.push(`username can't be empty`)
  }
  if (!/[a-zA-Z0-9]/.test(trimName)) {
    errors.username.push('invalid username')
  }
  if (trimName.length > 42) {
    errors.username.push('too long')
  }
  if (trimName.length < 2) {
    errors.username.push('too short')
  }
  if (password === '') {
    errors.password.push(`password can't be empty`)
  }
  if (password.length < 6) {
    errors.password.push(`password is too short (minimum is 6 characters)`)
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('Passwords do not match')
  }
  const hasErrors = Object.values(errors).find(value => value.length > 0)
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if (hasErrors) {
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  } else {
    const user = new User()
    user.username = trimName
    user.passwordDigest = md5(password)
    if (!duplicated) {
      await connection.manager.save(user)
      res.statusCode = 200
      res.write(JSON.stringify(user))
    } else {
      res.statusCode = 500
      res.write('')
    }

  }
  res.end()
}
export default Users
