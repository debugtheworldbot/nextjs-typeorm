import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'


const Sessions: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  const {username, password} = req.body
  const connection = await getDatabaseConnection()
  const user = await connection.manager.findOne(User, {where: {username}})
  if (user) {
    const passwordDigest = md5(password)
    if (passwordDigest === user.passwordDigest){
      res.statusCode = 200
      res.write(user)
    }else {
      res.statusCode = 422
      res.write(JSON.stringify({password: ['incorrect password']}))
    }
  } else {
    res.statusCode = 422
    res.write(JSON.stringify({username: ['user does not exist']}))
  }
  res.end()
}
export default Sessions
