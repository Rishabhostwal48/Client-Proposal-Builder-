import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();
  const fetchProposals = async () => {
    try {
      const response = await api.get("/proposal/list");

      console.log(response.data);
      setProposals(response.data.proposals);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this proposal?")
    const deleteProposal = await api.delete(`/proposal/${id}`);
    const reload = await fetchProposals();
    if (confirmation) {
      deleteProposal
      reload
    }
  }
  useEffect(() => {
    fetchProposals();
  }, []);
  return (
    <>
      {proposals.map((proposal) => (
        <div key={proposal._id}>
          <h3>{proposal.title}</h3>
          <button onClick={() => navigate(`/edit-proposal/${proposal._id}`)}>
            Edit Proposal
          </button>
          <button onClick={() => handleDelete(proposal._id)}>
            Delete Proposal
          </button>
        </div>
      ))}
      <button onClick={() => navigate("/create-proposal")}>
        Create Proposal
      </button>
    </>
  );
};
export default Dashboard;
