import React, {ReactChild, useCallback, useState} from 'react'

export function useForm<T> (initData: T,  fields: Field<T>[], buttons: ReactChild,onSubmit: (data: T) => void) {
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
  const _onSubmit = useCallback((e) => {
    e.preventDefault()
    try {
      onSubmit(data)
    }catch (e){

    }
  }, [onSubmit, data])
  return {
    form: <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.label}>
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
    </form>,
    setErrors
  }
}

interface Field<T> {
  label: string
  inputType: 'text'|'password'|'textArea'
  key: keyof T
}
