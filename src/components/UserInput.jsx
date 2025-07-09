import React from 'react'

const UserInput = () => {
  return (
    <main id="user-input" className="input-group">
      <div>
        <label htmlFor="input">INITIAL INVESTMENT</label>
        <input type="number" />
      
        <label htmlFor="input">ANNUAL INVESTMENT</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="input">EXPECTED RETURN</label>
        <input type="number" />

        <label htmlFor="input">DURATION</label>
        <input type="number" />
      </div>
    </main>
  )
}

export default UserInput
