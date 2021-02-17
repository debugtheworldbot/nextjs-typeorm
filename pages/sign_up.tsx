import {NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import axios from 'axios'

const SignUp: NextPage = () => {
  const [data, setData] = useState<Data>({
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
    await axios.post(`api/v1/users`, data)
    console.log(data)
  }, [data])

  return (
    <>
      <h1>注册</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input type="text" value={data.username}
                   onChange={event => setData({...data, username: event.target.value})}/>
          </label>
        </div>
        <div>
          <label>
            密码
            <input type="password" value={data.password}
                   onChange={event => setData({...data, password: event.target.value})}/>
          </label>
        </div>
        <div>
          <label>
            确认密码
            <input type="password" value={data.passwordConfirmation}
                   onChange={event => setData({...data, passwordConfirmation: event.target.value})}/>
          </label>
        </div>
        <button type={'submit'}>注册</button>
      </form>
    </>
  )
}

interface Data {
  username: string
  password: string
  passwordConfirmation: string
}

export default SignUp