import React, {FormEventHandler, useState} from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {Post} from '../../src/entity/Post'
import {comment} from 'postcss'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../../hooks/useForm'
import qs from 'query-string'

type Props = {
  post: Post
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props

  const {form} = useForm({comment: ''},
    [{label: '', inputType: 'textArea', key: 'comment'}],
    <button type={'submit'}>comment</button>,
    {
      request: (data) => axios.post(`api/v1/sessions`, data), success: () => {
        window.alert('success!')
      }
    })

  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}>
      </article>
      <footer>
        <h1>comments</h1>
        {form}
        <hr />
        {post.comments?.map(comment => <div>
          <h2>{comment.user}</h2>
          <div>
            {comment.content}
          </div>
          <span>createdAt {comment.createdAt}</span>
        </div>)}
      </footer>
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
