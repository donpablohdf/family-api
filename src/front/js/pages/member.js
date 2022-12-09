import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Member = (props) => {
  const token = localStorage.getItem("jwt-token");

  const { store, actions } = useContext(Context);
  const params = useParams();
  const [person, setPerson] = useState(["Cargando"]);

  useEffect(() => {
    const url = "/member/" + params.theid;

    const cumplePromesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI(url, "")); // prometo que traigo datos del obj
      });
    };
    cumplePromesa().then((datos) => {
      setPerson(datos);
    });
  }, [params.theid]);

  return (
    <div className="jumbotron p-5">
      <h4 className="display-4">
        Miembro: {person.last_name} {person.first_name}
      </h4>
      <h6>Edad: {person.age}</h6>
      <h6>Numeros de la suerte: {person.lucky_numbers}</h6>
      {token ? (
        <>
          <Link to={"/delete/"+params.theid}>Borrar</Link>
        </>
      ) : (
        <></>
      )}
      <hr className="my-4" />

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Home
        </span>
      </Link>
    </div>
  );
};

Member.propTypes = {
  match: PropTypes.object,
};
