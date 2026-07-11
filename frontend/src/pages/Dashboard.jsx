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
  useEffect(() => {
    fetchProposals();
  }, []);
  return (
    <>
      {proposals.map((proposal) => (
        <div key={proposal._id}>
          <h3>{proposal.title}</h3>
        </div>
      ))}
      <button onClick={() => navigate("/create-proposal")}>
        Create Proposal
      </button>
    </>
  );
};
export default Dashboard;
