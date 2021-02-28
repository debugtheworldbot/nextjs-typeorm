import {NextPage} from 'next'
import React from 'react'
import axios from 'axios'
import {useForm} from '../hooks/useForm'

const SignUp: NextPage = () => {
  const {form} = useForm({username: '', password: '', passwordConfirmation: ''},
    [{label: 'username', inputType: 'text', key: 'username'},
      {label: 'password', inputType: 'password', key: 'password'},
      {label: 'passwordConfirmation', inputType: 'password', key: 'passwordConfirmation'},
    ],
    <button type={'submit'}>sign up</button>,
    {
      request: (data) => axios.post(`api/v1/users`, data), message: 'success!'
    })

  return (
    <div>
      <h1>注册</h1>
      {form}
    </div>
  )
}

export default SignUp