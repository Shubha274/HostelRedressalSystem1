// import { useEffect } from "react";
// import StudentDashboard from "./Components/StudentDashboard/StudentDboard";
// import WardenDboard from "./Components/WardenDashBoard/WardenDboard";

// function App() {
//   return (
//     <>
//       <StudentDboard />
//       <WardenDboard />
//     </>
//   );
// }
// export default App;
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/SignPage/Login";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDboard />} />
        <Route path="/issue-form" element={<Forms />} />
        <Route path="/warden-dashboard" element={<WardenDboard />} />
        <Route path="/admin-dashboard" element={<AdminDboard />} />
      </Routes>
    </Router>
  );
};

export default App;
