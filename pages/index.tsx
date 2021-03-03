import {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'
import Link from 'next/link'

type Props = {
  posts: Post[]
}
const Posts: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(posts => <Link key={posts.id} href={`/posts/${posts.id}`}>
        <a>{posts.title}</a>
      </Link>)}
    </div>
  )
}

export default Posts

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
