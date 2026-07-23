import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { generatePdf } from "../utils/generatePdf";

const Dashboard = () => {
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all proposals
  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/proposal/list");

      setProposals(response.data.proposals);
    } catch (error) {
      console.error(error);
      setError("Failed to load proposals.");
    } finally {
      setLoading(false);
    }
  };

  // Delete proposal
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this proposal?"
    );

    if (!confirmation) return;

    try {
      await api.delete(`/proposal/${id}`);
      fetchProposals();
      alert("Proposal deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete proposal.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Loading State
  if (loading) {
    return <h2>Loading proposals...</h2>;
  }

  // Error State
  if (error) {
    return <h2>{error}</h2>;
  }

  // Empty State
  if (proposals.length === 0) {
    return (
      <div>
        <h2>No proposals found.</h2>
        <p>Start by creating your first proposal.</p>

        <button onClick={() => navigate("/create-proposal")} style={{ marginLeft: "10px" }}>
           Create Proposal
        </button>

        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Total Proposals : {proposals.length}</h3>

      <button onClick={() => navigate("/create-proposal")} style={{ marginLeft: "10px" }}>
        + New Proposal
      </button>

      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>

      <hr />

      {proposals.map((proposal) => (
        <div
          key={proposal._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h2>{proposal.title}</h2>

          <p>
            <strong>Client:</strong> {proposal.clientName}
          </p>

          <p>
            <strong>Email:</strong> {proposal.clientEmail}
          </p>

          <p>
            <strong>Description:</strong> {proposal.projectDescription}
          </p>

          <p>
            <strong>Budget:</strong> ₹{proposal.price}
          </p>

          <p>
            <strong>Timeline:</strong> {proposal.timeline}
          </p>

          <p>
            <strong>Status:</strong> {proposal.status}
          </p>

          <button
            onClick={() =>
              navigate(`/edit-proposal/${proposal._id}`)
            }
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(proposal._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
          <button
            onClick={() => { generatePdf(proposal) }}
            style={{ marginLeft: "10px" }}
          >
            Generate PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;