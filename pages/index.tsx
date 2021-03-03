import {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'
import Link from 'next/link'
import qs from 'query-string'

type Props = {
  posts: Post[]
  total: number
  page: number
  size: number
}
const Posts: NextPage<Props> = (props) => {
  const {posts, total, page, size} = props
  const totalPage = Math.ceil(total / size)

  const validPage = (page: number) => {
    if (page <= 0) {
      return 1
    }
    if (page > totalPage) {
      return totalPage
    }
    return page
  }

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(posts =>
        <div key={posts.id}>
          <Link href={`/posts/${posts.id}`}>
            <a>{posts.title}</a>
          </Link>
        </div>
      )}
      <div>
        <Link href={`/posts?page=${validPage(page - 1)}`}>
          <a>previous</a>
        </Link>
        |
        <Link href={`/posts?page=${validPage(page + 1)}`}>
          <a>next</a>
        </Link>
        |
        {page}/{totalPage} , total {total} items
      </div>

    </div>
  )
}

export default Posts

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const index = context.req.url.indexOf('?')
  const query = qs.parse(context.req.url.substr(index > 0 ? index : 0))
  const page = parseInt(query.page?.toString() || '1')
  const size = 3
  const [posts, total] = await connection.manager.findAndCount(Post, {skip: (page - 1) * size, take: size})

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      page, size
    }
  }
}
