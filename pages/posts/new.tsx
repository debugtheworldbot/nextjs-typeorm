import {NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import {Form} from '../../components/Form'
import axios, {AxiosResponse} from 'axios'

const PostNew: NextPage = () => {
  const [data, setData] = useState({
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState({
    title: [],
    content: [],
  })
  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
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
  }, [data])
  const onChange = useCallback((key: string, value: string) => {
    setData({...data, [key]: value})
  }, [data])
  return (
    <Form onSubmit={onSubmit} buttons={<button type={'submit'}>post</button>} fields={[
      {
        label: 'title',
        value: data.title,
        inputType: 'text',
        onChange: event => onChange('title', event.target.value),
        errors: errors.title
      },
      {
        label: 'content',
        value: data.content,
        inputType: 'textArea',
        onChange: event => onChange('content', event.target.value),
        errors: errors.content
      }
    ]} />
  )
}

export default PostNew