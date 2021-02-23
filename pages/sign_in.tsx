import {GetServerSideProps, NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'

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

  return (
    <>
      {user && <div>
          current user is {user.username}
      </div>}
      <h1>登录</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input type="text" value={data.username}
                   onChange={event => setData({...data, username: event.target.value})}/>
            {errors.username?.length > 0 && <span>{errors.username.join(' ; ')}</span>}
          </label>
        </div>
        <div>
          <label>
            密码
            <input type="password" value={data.password}
                   onChange={event => setData({...data, password: event.target.value})}/>
            {errors.password?.length > 0 && <span>{errors.password.join(' ; ')}</span>}
          </label>
        </div>
        <button type={'submit'}>登录</button>
      </form>
    </>
  )
}

interface Data {
  username: string
  password: string
}

export default SignIn

// todo
// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  console.log(user)
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
})