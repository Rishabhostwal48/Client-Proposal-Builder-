import { useState } from "react";
import api from "../services/api";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await api.post("/auth/register", formData);
    console.log(response.data);
  };
  return (
    <form onSubmit={handleSubmit}>
      Name:
      <input type="text" name="name" required onChange={handleChange} />
      Email:
      <input type="email" name="email" required onChange={handleChange} />
      Password:
      <input type="password" name="password" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
