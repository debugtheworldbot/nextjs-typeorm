import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import React from 'react'
import axios from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'
import {useForm} from '../hooks/useForm'

const SignIn: NextPage<{ user: User }> = (props) => {
  const {user} = props

  const {form} = useForm({username: '', password: ''},
    [{label: 'username', inputType: 'text', key: 'username'},
      {label: 'password', inputType: 'password', key: 'password'}],
    <button type={'submit'}>log in</button>,
    {
      request: (data) => axios.post(`api/v1/sessions`, data), message: 'success'
    })

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