import {NextApiHandler} from 'next'
import {Post} from '../../../src/entity/Post'


const Posts: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'POST') {
    const {title, content} = req.body
    const post = new Post()
    post.title = title
    post.content = content
    post.validate()
    if (post.hasErrors()) {
      res.statusCode = 422
      res.write(JSON.stringify(post.errors))
    } else {
      res.statusCode = 200
    }
  }
  res.end()
}
export default Posts
