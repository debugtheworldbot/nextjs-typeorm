import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'


const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const connection = await getDatabaseConnection()
  const user = new User()
  user.username = username.trim()
  user.passwordDigest = md5(password)
  user.password = password
  user.passwordConfirmation = passwordConfirmation

  await user.validate()
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if (user.hasErrors()){
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  }else {
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
  // const errors = {
  //   username: [] as string[],
  //   password: [] as string[],
  //   passwordConfirmation: [] as string[],
  // }
  // const trimName = username.trim()
  // const connection = await getDatabaseConnection()
  // const duplicated = await connection.manager.findOne(User, {username})
  // if (duplicated){
  //   errors.username.push('username has been token,please try to use another name')
  // }
  // if (trimName === '') {
  //   errors.username.push(`username can't be empty`)
  // }
  // if (!/[a-zA-Z0-9]/.test(trimName)) {
  //   errors.username.push('invalid username')
  // }
  // if (trimName.length > 42) {
  //   errors.username.push('too long')
  // }
  // if (trimName.length < 2) {
  //   errors.username.push('too short')
  // }
  // if (password === '') {
  //   errors.password.push(`password can't be empty`)
  // }
  // if (password.length < 6) {
  //   errors.password.push(`password is too short (minimum is 6 characters)`)
  // }
  // if (password !== passwordConfirmation) {
  //   errors.passwordConfirmation.push('Passwords do not match')
  // }
  // const hasErrors = Object.values(errors).find(value => value.length > 0)

}
export default Users
