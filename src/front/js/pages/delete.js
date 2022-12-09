import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Delete = (props) => {
  const token = localStorage.getItem("jwt-token");
  const { store, actions } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    const url = "/delete/"+ params.theid;
    const method = "POST";
    const head = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
      actions.solicitudesAPI(url, method, head, '');
    
  }, [])

  return (
    <div className="m-3">
      <h1>Usuario borrado</h1>
      <Link to={"/"}>HOME</Link>
    </div>
  );
};
Delete.propTypes = {
    match: PropTypes.object,
  };
  
export default Delete;
