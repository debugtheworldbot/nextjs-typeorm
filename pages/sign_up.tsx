import {NextPage} from 'next'
import React from 'react'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../hooks/useForm'

const SignUp: NextPage = () => {

  const onSubmit = async (data: typeof initData) => {
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
  }

  const initData = {username: '', password: '', passwordConfirmation: ''}

  const {form, setErrors} = useForm(initData,
    [
      {
        label: 'username',
        inputType: 'text',
        key: 'username'
      },
      {
        label: 'password',
        inputType: 'password',
        key: 'password'
      },
      {
        label: 'passwordConfirmation',
        inputType: 'password',
        key: 'passwordConfirmation'
      },
    ],
    <button type={'submit'}>sign up</button>,
    onSubmit)

  return (
    <div>
      <h1>注册</h1>
      {form}
    </div>
  )
}

export default SignUp