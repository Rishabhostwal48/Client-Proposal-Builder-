import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditProposal = () => {
  const { id } = useParams();
  const fetchProposals = async () => {
    try {
      const response = await api.get(`/proposal/${id}`);

      console.log(response.data);
      setFormData(response.data.proposal);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    fetchProposals();
  }, []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await api.put(`proposal/${id}`, formData);
    console.log(response.data);
    navigate("/dashboard");
  };
  return (<>
    {formData && (
      <form onSubmit={handleSubmit}>
        Title edit:
        <input
          type="text"
          name="title"
        value={formData.title}
        onChange={handleChange}
      />
      Client Name:
      <input
        type="text"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
      />
      Client Email:{" "}
      <input
        type="email"
        name="clientEmail"
        value={formData.clientEmail}
        onChange={handleChange}
      />
      Project:{" "}
      <input
        type="text"
        name="project"
        value={formData.project}
        onChange={handleChange}
      />
      Project Description:{" "}
      <input
        type="text"
        name="projectDescription"
        value={formData.projectDescription}
        onChange={handleChange}
      />
      Price:{" "}
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      Timeline:{" "}
      <input
        type="text"
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
      />
      <button type="submit">Save Proposal</button>
    </form>)}
    </>
  );
};

export default EditProposal;
