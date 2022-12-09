import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  let token = false;
  const [itemsMenu, setItemsMenu] = useState(["Cargando"]);

  const { actions } = useContext(Context);
  token = localStorage.getItem("jwt-token");
  useEffect(() => {
    const cumplePromesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/members", "")); // prometo que traigo datos del obj
      });
    };
    cumplePromesa().then((datos) => {
      setItemsMenu(datos);
    });
  }, [token]);

  return (
    <>
      <div className="me-2">
        <div className="d-inline-flex shadow ms-3 mt-3">
          <ul className="dropdown-menu dropdown-menu-dark d-block position-static shadow w-220px">
            {itemsMenu.map((opcion, index) => (
              <li key={index} className="d-flex justify-content-betweenp-0 m-0">
                <Link
                  className="dropdown-item d-flex gap-2 align-items-end ps-4 py-4"
                  to={"/member/" + opcion.id}
                >
                  {opcion.last_name}
                </Link>
              </li>
            ))}

            {!token ? (
              <>
                <li className="d-flex justify-content-betweenp-0 m-0">
                  <Link
                    className="dropdown-item d-flex gap-2 align-items-end ps-4 py-4"
                    to={"/login"}
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="d-flex justify-content-betweenp-0 m-0">
                  <Link
                    className="dropdown-item d-flex gap-2 align-items-end ps-4 py-4"
                    to={"/logout"}
                  >
                    LOGOUT
                  </Link>
                </li>
                <li className="d-flex justify-content-betweenp-0 m-0">
                  <Link
                    className="dropdown-item d-flex gap-2 align-items-end ps-4 py-4"
                    to={"/signup"}
                  >
                    Crear nuevo
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
