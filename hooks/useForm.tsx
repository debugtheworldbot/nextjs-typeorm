import React, {ReactChild, useCallback, useState} from 'react'
import {AxiosResponse} from 'axios'

export function useForm<T> (initData: T, fields: Field<T>[], buttons: ReactChild,
                            submit: {
                              request: (data: T) => Promise<AxiosResponse<T>>,
                              success: () => void
                            }) {
  const [data, setData] = useState(initData)
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {}
    for (let key in initData) {
      if (initData.hasOwnProperty(key)) {
        e[key] = []
      }
    }
    return e
  })
  const onChange = useCallback((key: keyof T, value: any) => {
    setData({...data, [key]: value})
  }, [data])
  const _onSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      await submit.request(data)
      submit.success()
    } catch (e) {
      if (e.response) {
        const response: AxiosResponse = e.response
        if (response.status === 401) {
          window.alert('please login!')
          window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`
        }
        if (response.status === 422) {
          setErrors(response.data)
        }
      }
    }
  }, [submit, data])
  return {
    form: <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()}>
          <label>
            {field.label}
            {field.inputType === 'textArea' ?
              <textarea onChange={(e) => onChange(field.key, e.target.value)} value={data[field.key].toString()} /> :
              <input type={field.inputType} value={data[field.key].toString()}
                     onChange={(e) => onChange(field.key, e.target.value)} />}
            {errors[field.key]?.length > 0 && <span>{errors[field.key].join(' ; ')}</span>}
          </label>
        </div>)}
      <div>
        {buttons}
      </div>
    </form>
  }
}

interface Field<T> {
  label: string
  inputType: 'text'|'password'|'textArea'
  key: keyof T
}
