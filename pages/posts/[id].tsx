import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {Post} from '../../src/entity/Post'
import axios from 'axios'
import {useForm} from '../../hooks/useForm'
import {Comment} from '../../src/entity/Comment'

type Props = {
  post: Post
  comments?: Comment[]
}
const postsShow: NextPage<Props> = (props) => {
  const {post, comments} = props

  const {form} = useForm({comment: '', postId: post.id},
    [{label: '', inputType: 'textArea', key: 'comment'}],
    <button type={'submit'}>comment</button>,
    {
      request: (data) => axios.post(`http://localhost:3000/api/v1/comment`, data), success: () => {
        window.alert('comment success!')
        location.reload()
      }
    })

  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}>
      </article>
      <footer>
        <h2>comments</h2>
        {form}
        <hr />
        {comments?.map(comment => <div key={comment.id}>
          <h3>{comment.user}</h3>
          <div>
            {comment.content}
          </div>
          <span>created at {comment.createdAt.toString().slice(0, 10)}</span>
          <hr />
        </div>)}
      </footer>
    </div>
  )
}

export default postsShow

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id)
  const comments = await connection.manager.find(Comment, {post: post})
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      comments: JSON.parse(JSON.stringify(comments)),
    }
  }
}

// export const getStaticPaths = async () => {
//   const idList = await getPostIds();
//   return {
//     paths: idList.map(id => ({params: {id: id}})),
//     fallback: true
//   };
// };
//
// export const getStaticProps = async (x: any) => {
//   const id = x.params.id;
//   const post = await getPost(id);
//   return {
//     props: {
//       post: post
//     }
//   };
// };
