import { useEffect } from "react";
import "./StudentDboard.css";
import "../IssueForm/Forms";
const StudentDboard = () => {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <h1>our student dashboard page</h1>
      <p>i am shubha</p>
      {/* <Forms /> */}
    </>
  );
};
export default StudentDboard;
