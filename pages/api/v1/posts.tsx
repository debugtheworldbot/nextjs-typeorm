import {NextApiHandler} from 'next'
import {getPosts} from 'lib/posts'


const Posts: NextApiHandler = async (req, res) => {
  const {title, content} = req.body
  const posts = await getPosts()
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.write(JSON.stringify(posts))
  res.end()
}
export default Posts
