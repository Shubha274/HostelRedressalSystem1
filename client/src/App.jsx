import { useState } from "react";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import ChatbotAdm from "./Components/ChatbotAdm/ChatbotAdm";
import RoleBasedTable from "./Components/Tables/RoleBasedTable";
import ChatbotWar from "./Components/ChatbotWar/ChatbotWar";
import ChatbotHeadWar from "./Components/ChatbotHeadWar/ChatbotHeadWar";

function App() {
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("Pending");

  return (
    <>
      <StudentDashboard />

      <ChatbotHeadWar />
      <ChatbotWar />
      <ChatbotAdm />
      
      <div className="controls">
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="warden">Warden</option>
          </select>
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
      </div>

      {/* Role-Based Table */}
      <RoleBasedTable role={role} status={status} />
    </>
  );
}

export default App;
