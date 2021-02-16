import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {Post} from '../../src/entity/Post'

type Props = {
  post: Post
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}>
      </article>
    </div>
  )
}

export default postsShow

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id)
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
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
