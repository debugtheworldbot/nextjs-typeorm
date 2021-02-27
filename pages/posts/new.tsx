import {NextPage} from 'next'
import React from 'react'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../../hooks/useForm'

const PostNew: NextPage = () => {

  const onSubmit = async (data: typeof initData) => {
    try {
      await axios.post(`api/v1/posts`, data)
      window.alert('post success!')
    } catch (e) {
      if (e.response) {
        const response: AxiosResponse = e.response
        if (response.status === 422) {
          setErrors(response.data)
        }
      }
    }
  }

  const initData = {title: '', content: ''}

  const {form, setErrors} = useForm(initData,
    [
      {
        label: 'title',
        inputType: 'text',
        key: 'title'
      },
      {
        label: 'content',
        inputType: 'textArea',
        key: 'content'
      }
    ],
    <button type={'submit'}>post</button>,
    onSubmit)

  return (
    <div>
      {form}
    </div>
  )

}

export default PostNew