import React from 'react'

const Input = ({value=0, type,  onChange, children}) => {
  
  return (
    <p>
      <label htmlFor="input">{children}</label>
      <input required type="number" value={value} onChange={(event) => onChange(event,type)}/>
    </p>
  )
}

export default Input
