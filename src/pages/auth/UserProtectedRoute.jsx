import React from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tm_token");
  const verified = localStorage.getItem("tm_verified");
  const id = localStorage.getItem("tm_id");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token || verified !== "true" || !id) {
      navigate("/");
    }
  });

  return <>{children}</>;
};

export default UserProtectedRoute;
