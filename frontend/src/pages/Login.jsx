import React from 'react'

const login = () => {
  return (
    <form >
      Email:<input type="email" name="email" required/>
      Password:<input type="password" name="password" required/>
      <button type="submit">Login</button>
    </form>
  )
}

export default login