import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react'

export const Form = (props: Props) => {
  const {onSubmit, fields, buttons} = props
  return (
    <form onSubmit={onSubmit}>
      {fields.map(field =>
        <div key={field.label}>
          <label>
            {field.label}
            {field.inputType === 'textArea' ? <textarea onChange={field.onChange} value={field.value} /> :
              <input type={field.inputType} value={field.value} onChange={field.onChange} />}
            {field.errors?.length > 0 && <span>{field.errors.join(' ; ')}</span>}
          </label>
        </div>)}
      <div>
        {buttons}
      </div>
    </form>
  )
}

interface Props {
  onSubmit: FormEventHandler
  buttons: ReactChild
  fields: {
    label: string
    inputType: 'text'|'password'|'textArea'
    value: string|number
    onChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>
    errors: string[]
  }[]

}