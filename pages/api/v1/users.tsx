import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'


const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  if (password !== passwordConfirmation) {
    const error = {passwordConfirmation: ['Passwords do not match']}
    res.statusCode = 422
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(error))
    res.end()
  }
  const connection = await getDatabaseConnection()
  const user = new User()
  user.username = username
  user.passwordDigest = password
  await connection.manager.save(user)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write('success')
  res.end()
}
export default Users
