import {NextApiHandler} from 'next'
import {withSession} from '../../../lib/withSession'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {Post} from '../../../src/entity/Post'
import {Comment} from '../../../src/entity/Comment'


const Comments: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const {postId, comment} = req.body
    const connection = await getDatabaseConnection()
    const user = req.session.get('currentUser')
    if (!user) {
      res.statusCode = 401
      return res.end()
    }
    const currentPost = await connection.manager.findOne(Post, {id: postId})
    const newComment = new Comment()
    if (!comment) {
      res.statusCode = 422
      res.write(JSON.stringify({comment: ['comment cant be empty!']}))
      return res.end()
    }
    newComment.content = comment
    newComment.user = user
    newComment.post = currentPost
    await connection.manager.save(newComment)
    res.json(currentPost)
  }
})
export default Comments
