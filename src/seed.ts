import "reflect-metadata"
import {createConnection} from "typeorm"
import {Post} from './entity/Post'
import {User} from './entity/User'
import {Comment} from './entity/Comment'

createConnection().then(async connection => {
  const {manager} = connection
  const u1 = new User()
  u1.username = 'testName'
  u1.passwordDigest = 'testPassword'
  await manager.save(u1)
  const p1 = new Post()
  p1.author = u1
  p1.title = 'a post'
  p1.content = 'post content!'
  await manager.save(p1)
  const c1 = new Comment()
  c1.user = u1
  c1.post = p1
  c1.content = 'this is a comment !'
  await manager.save(c1)
  await connection.close()
}).catch(error => console.log(error))
