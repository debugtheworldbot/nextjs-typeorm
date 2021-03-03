import {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'
import Link from 'next/link'
import qs from 'query-string'

type Props = {
  posts: Post[]
  total:number
}
const Posts: NextPage<Props> = (props) => {
  const {posts,total} = props
  return (
    <div>
      <h1>文章列表 total : {total}</h1>
      {posts.map(posts =>
        <div key={posts.id}>
          <Link href={`/posts/${posts.id}`}>
            <a>{posts.title}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Posts

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const index = context.req.url.indexOf('?')
  const query = qs.parse(context.req.url.substr(index))
  const page = parseInt(query.page.toString() || '1')
  console.log(page)
  const size = 3
  const [posts,total] = await connection.manager.findAndCount(Post, {skip: (page - 1) * size,take:size})

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total
    }
  }
}
