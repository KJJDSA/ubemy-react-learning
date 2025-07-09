import React from 'react'

const Input = ({value=0, type,  onChange, children}) => {
  
  return (
    <label htmlFor="input">
      {children}
      <input type="number" value={value} onChange={(event) => onChange(event,type)}/>
    </label>
  )
}

export default Input
