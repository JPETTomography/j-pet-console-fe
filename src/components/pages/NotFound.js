import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../partials/Page";

const NotFound = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const verifyToken = useCallback(
    async (token) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/verify-token/${token}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Token verifiation failed");
        }
        const data = await response.json();
        setCurrentUser(data.payload.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    },
    [navigate]
  );

  const token = localStorage.getItem("token");
  verifyToken(token);

  return (
    <Page currentUser={currentUser}>
      <div className="flex-1 flex flex-col justify-center items-center gap-6 font-medium">
        <img src="/images/404.png" alt="404 error graphics" className="w-72" />
        <h1>Page Not Found</h1>
        <div>
          <p>Unfortunately, the page you're looking for could not be found.</p>
          <p>Please check if the URL is correct or return to the homepage.</p>
        </div>
        <a href="/" className="text-sky-700 hover:text-sky-900 hover:underline">
          Back to main page
        </a>
      </div>
    </Page>
  );
};

export default NotFound;
