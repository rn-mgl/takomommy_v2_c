import React from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tm_adm_token");
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

export default AdminProtectedRoute;
