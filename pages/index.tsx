import {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'

type Props = {
  posts: Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      {posts.map(posts => <div key={posts.id}>
        <h1>{posts.title}</h1>
        <div>{posts.author}</div>
        <article>{posts.content}</article>
        <footer>{posts.comments}</footer>
      </div>)}
    </div>
  )
}
export default index

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
