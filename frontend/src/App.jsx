import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateProposal from "./pages/CreateProposal";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/create-proposal" element={<CreateProposal/>}/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
