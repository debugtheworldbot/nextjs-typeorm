import {NextApiHandler} from 'next'
import {Post} from '../../../src/entity/Post'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {withSession} from '../../../lib/withSession'


const Posts: NextApiHandler = withSession(async (req, res) => {
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'POST') {
    const {title, content} = req.body
    const post = new Post()
    post.title = title
    post.content = content
    post.validate()
    const connection = await getDatabaseConnection()
    const user = req.session.get('currentUser')
    if (!user) {
      res.statusCode = 401
      return res.end()
    }
    if (post.hasErrors()) {
      res.statusCode = 422
      res.write(JSON.stringify(post.errors))
      res.end()
    } else {
      post.author = user
      await connection.manager.save(post)
      res.json(post)
    }
  }
})
export default Posts
