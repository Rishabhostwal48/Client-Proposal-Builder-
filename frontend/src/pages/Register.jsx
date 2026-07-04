import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <form>
      Name:
      <input type="text" name="name" required onChange={handleChange} />
      Email:
      <input type="email" name="email" required />
      Password:
      <input type="password" name="password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
