import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const Tabless = () => {
  const [data, setData] = useState([]); // State for storing issue data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for storing errors

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        const { role, userId } = decodedToken;

        axios
          .get(`http://localhost:8080/api/issues/${role}/${userId}`)
          .then((response) => {
            setData(response.data); // Set fetched data into state
            setLoading(false); // Stop loading
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setError("Failed to load issue data.");
            setLoading(false); // Stop loading
          });
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        setError("Invalid token. Please log in again.");
        setLoading(false); // Stop loading
      }
    } else {
      console.error("No token found!");
      setError("User not authenticated.");
      setLoading(false); // Stop loading
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Issues</h1>
      {data.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Issue Name</th>
              <th>Description</th>
              <th>Generated</th>
              <th>Solved</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.iname}</td>
                <td>{issue.description}</td>
                <td>{new Date(issue.issueGenerated).toLocaleString()}</td>
                <td>
                  {issue.issueSolved
                    ? new Date(issue.issueSolved).toLocaleString()
                    : "Not solved yet"}
                </td>
                <td>{issue.issueStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tabless;
