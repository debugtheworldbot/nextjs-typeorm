import {NextApiHandler} from 'next'
import {withSession} from '../../../lib/withSession'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {Post} from '../../../src/entity/Post'
import {Comment} from '../../../src/entity/Comment'


const Comments: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const {postId, comment} = req.body
    const connection = await getDatabaseConnection()
    const currentPost = await connection.manager.findOne(Post, {id: postId})
    const C = new Comment()
    C.content = comment
    if (!comment) {
      res.statusCode = 422
      res.write(JSON.stringify({comment: ['comment cant be empty!']}))
      res.end()
    }
    if (currentPost.comments) {
      currentPost.comments.push(C)
    } else {
      currentPost.comments = [C]
    }
    await connection.manager.save(currentPost)
    res.json(currentPost)
  }
})
export default Comments
