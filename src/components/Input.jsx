import React from 'react'

const Input = ({value=0, inputId,  onChange, children}) => {
  
  return (
    <p>
      <label htmlFor="input">{children}</label>
      <input required value={value} onChange={(event) => onChange(event.target.value,inputId)}/>
    </p>
  )
}

export default Input
