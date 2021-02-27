import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'
import {Form} from '../components/Form'

const SignIn: NextPage<{ user: User }> = (props) => {
  const {user} = props
  const [data, setData] = useState<Data>({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })
  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      await axios.post(`api/v1/sessions`, data)
      window.alert('success')
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
      {user && <div>
          current user is {user.username}
      </div>}
      <h1>登录</h1>
      <Form onSubmit={onSubmit} buttons={<button type={'submit'}>登录</button>} fields={[
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
      ]} />
    </>
  )
}

interface Data {
  username: string
  password: string
}

export default SignIn

// todo
export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
})