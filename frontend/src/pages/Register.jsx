import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  };
  return (
    <form>
      Name:
      <input type="text" name="name" required onChange={handleChange} />
      Email:
      <input type="email" name="email" required onChange={handleChange}/>
      Password:
      <input type="password" name="password" required onChange={handleChange}/>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
