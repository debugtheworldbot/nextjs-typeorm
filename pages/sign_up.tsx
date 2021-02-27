import {NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import {Form} from '../components/Form'

const SignUp: NextPage = () => {
  const [data, setData] = useState<Data>({
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: []

  })
  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      await axios.post(`api/v1/users`, data)
      window.alert('success!')
      window.location.href = '/sign_in'
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
    <>
      <h1>注册</h1>
      <Form onSubmit={onSubmit} buttons={<button type={'submit'}>注册</button>} fields={[
        {
          label: 'username',
          value: data.username,
          inputType: 'text',
          onChange: event => onChange('username', event.target.value),
          errors: errors.username
        },
        {
          label: 'password',
          value: data.password,
          inputType: 'password',
          onChange: event => onChange('password', event.target.value),
          errors: errors.password
        },
        {
          label: 'passwordConfirmation',
          value: data.passwordConfirmation,
          inputType: 'password',
          onChange: event => onChange('passwordConfirmation', event.target.value),
          errors: errors.passwordConfirmation
        },
      ]} />
    </>
  )
}

interface Data {
  username: string
  password: string
  passwordConfirmation: string
}

export default SignUp