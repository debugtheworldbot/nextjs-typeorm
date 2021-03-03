import {NextPage} from 'next'
import React from 'react'
import axios from 'axios'
import {useForm} from '../../hooks/useForm'

const PostNew: NextPage = () => {


  const {form} = useForm({title: '', content: ''},
    [{label: 'title', inputType: 'text', key: 'title'},
      {label: 'content', inputType: 'textArea', key: 'content'}],
    <button type={'submit'}>post</button>,
    {
      request: (data) => axios.post(`http://localhost:3000/api/v1/posts`, data),
      success: () => {
        window.alert('post success!')
        window.location.href = '/'
      }
    }
  )

  return (
    <div>
      {form}
    </div>
  )

}

export default PostNew