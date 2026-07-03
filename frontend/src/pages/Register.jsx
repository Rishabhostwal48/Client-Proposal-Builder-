import React from 'react'

const register = () => {
  return (
    <form>
        Name:<input type="text" name="name" required />
        Email:<input type="email" name="email" required />
        Password:<input type="password" name="password" required />
        <button type="submit">Register</button>
    </form>
)
}

export default register