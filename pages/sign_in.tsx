import {NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'

const SignUp: NextPage = () => {
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
    } catch (e) {
      if (e.response) {
        const response: AxiosResponse = e.response
        if (response.status === 422) {
          setErrors({...errors, ...response.data})
        }
      }
    }
  }, [data])

  return (
    <>
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

export default SignUp