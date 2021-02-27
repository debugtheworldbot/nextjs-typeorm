import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import React from 'react'
import axios, {AxiosResponse} from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'
import {useForm} from '../hooks/useForm'

const SignIn: NextPage<{ user: User }> = (props) => {
  const {user} = props

  const onSubmit = async (data: typeof initData) => {
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
  }
  const initData = {username: '', password: ''}

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
      }
    ],
    <button type={'submit'}>log in</button>,
    onSubmit)

  return (
    <div>
      {user && <div>
          current user is {user.username}
      </div>}
      <h1>登录</h1>
      {form}
    </div>
  )

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