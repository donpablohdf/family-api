import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

export const Logout = () => {
  const token = localStorage.getItem("jwt-token");
  useEffect(() => {
    if (token) {
      const token = localStorage.removeItem("jwt-token");
    }
  }, []);

  return (
    <div className="m-3">
      <h1>Has cerrado sesión</h1>
      <Link to={"/"}>HOME</Link>
    </div>
  );
};

export default Logout;
