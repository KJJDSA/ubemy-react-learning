import React from 'react'

const UserInput = () => {
  return (
    <main id="user-input" className="input-group">
        <label htmlFor="input">INITIAL INVESTMENT
          <input type="number" />
        </label>
        
        <label htmlFor="input">ANNUAL INVESTMENT
          <input type="number" />
        </label>

        <label htmlFor="input">EXPECTED RETURN
          <input type="number" />
        </label>
        
        <label htmlFor="input">DURATION
          <input type="number" />
        </label>
    </main>
  )
}

export default UserInput
