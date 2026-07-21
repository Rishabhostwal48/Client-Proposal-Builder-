import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateProposal = () => {
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    projectDescription: "",
    price: "",
    timeline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(formData);
    const response = await api.post("proposal/create", formData);
    console.log(response.data);
    navigate("/dashboard");
  } 
  return (
    <form onSubmit={handleSubmit}>
      Title:
      <input type="text" name="title" onChange={handleChange} />
      Client Name:
      <input type="text" name="clientName" onChange={handleChange} />
      Client Email:{" "}
      <input type="email" name="clientEmail" onChange={handleChange} />
      Project: <input type="text" name="project" onChange={handleChange} />
      Project Description:{" "}
      <input type="text" name="projectDescription" onChange={handleChange} />
      Price: <input type="number" name="price" onChange={handleChange} />
      Timeline: <input type="text" name="timeline" onChange={handleChange} />
        <button type="submit" >Create Proposal</button>
    </form> 
  );
};

export default CreateProposal;
