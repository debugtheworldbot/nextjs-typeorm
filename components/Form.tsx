import React, {ChangeEventHandler} from 'react'

export const Form = (props: Props) => {
  const {onSubmit, fields,submitText} = props
  return (
    <form onSubmit={onSubmit}>
      {fields.map(field =>
        <div>
          <label>
            {field.label}
            <input type={field.inputType} value={field.value} onChange={field.onChange} />
            {field.errors?.length > 0 && <span>{field.errors.join(' ; ')}</span>}
          </label>
        </div>)}
      <button type={'submit'}>{submitText}</button>
    </form>
  )
}

interface Props {
  onSubmit: (e: any) => Promise<void>
  submitText:string
  fields: {
    label: string
    inputType: 'text'|'password'
    value: string|number
    onChange: ChangeEventHandler <HTMLInputElement | HTMLTextAreaElement>
    errors: string[]
  }[]

}