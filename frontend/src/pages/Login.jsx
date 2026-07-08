import { useState } from "react";
import api from "../services/api"
import {useNavigate} from "react-router-dom"


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await api.post("auth/login", formData);
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    
    navigate("/dashboard");
  };
  return (
    <form onSubmit={handleSubmit}>
      Email:
      <input type="email" name="email" required onChange={handleChange} />
      Password:
      <input type="password" name="password" required onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
