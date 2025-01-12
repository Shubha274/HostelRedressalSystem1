import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { FaUsers, FaLock, FaCommentDots } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import "./About.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../NavBar/Navbar";
const About = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="about-container">
        <div className="title-container">
          <Typography variant="h4" className="title">
            From Desk to Digital
          </Typography>
          <Typography variant="h5" className="subtitle">
            Revolutionizing Hostel Redressal Management
          </Typography>

          {/* About Description Section */}
          <div className="about-description">
            <Typography
              variant="h6"
              align="center"
              className="description-text"
            >
              The Hostel Redressal System streamlines communication between
              students and hostel authorities through real-time chats, data
              tracking, and clear visibility of pending or resolved issues,
              ensuring a responsive hostel environment.
            </Typography>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="card-container">
            <div className="about-card">
              <FaCommentDots size={50} color="#1a237e" />
              <Typography variant="h5" align="center" className="card-title">
                Easy Communication
              </Typography>
              <Typography variant="body1" align="center" className="card-body">
                Our system enables seamless communication between students and
                wardens, and between wardens and head wardens via a chat
                feature, ensuring quick responses and resolutions.
              </Typography>
            </div>

            <div className="about-card">
              <FaLock size={50} color="#1a237e" />
              <Typography variant="h5" align="center" className="card-title">
                Confidentiality Assured
              </Typography>
              <Typography variant="body1" align="center" className="card-body">
                We prioritize privacy and confidentiality in all interactions.
                Your grievance details and communication are kept secure and
                confidential.
              </Typography>
            </div>

            <div className="about-card">
              <FaUsers size={50} color="#1a237e" />
              <Typography variant="h5" align="center" className="card-title">
                Swift Grievance Resolution
              </Typography>
              <Typography variant="body1" align="center" className="card-body">
                With the system’s easy-to-use interface and prompt responses,
                grievances are addressed swiftly, ensuring a comfortable and
                stress-free environment for students.
              </Typography>
            </div>

            <div className="about-card">
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  size="2x"
                  color="#1a237e"
                />
              </div>
              <Typography variant="h5" align="center" className="card-title">
                Status
              </Typography>
              <Typography variant="body1" align="center" className="card-body">
                Our system enables you to ensure the status of grievance
                SOLVED/RESOLVED.
              </Typography>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="footer-container">
          <div className="footer-content">
            <Typography variant="body2" align="center" className="footer-text">
              &copy; {new Date().getFullYear()} Banasthali Vidyapith. All Rights
              Reserved.
            </Typography>
            <Typography
              variant="body2"
              align="center"
              className="footer-contact"
            >
              Contact us:{" "}
              <a href="mailto:info@banasthali.org">info@banasthali.org</a> |
              Phone: +91-12345-67890
            </Typography>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
