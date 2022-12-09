import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

export const FormSignup = () => {
    let history = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const { actions } = useContext(Context);
  const token = localStorage.getItem("jwt-token");
  const [items_py, setitems_py] = useState();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    const url = "/signup";
    const method = "POST";
    const head = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    setitems_py(() => {
      actions.solicitudesAPI(url, method, head, data);
      history("/")

    });
  };

  return (
    <div className="">
      <div className="container p-0 m-3 d-flex flex-column bg-light shadow">
        <header className="d-flex justify-content-center mt-3">
          <h1 className="fw-lighter">SIGNUP</h1>
          <Link to={"/"}>Home</Link>
        </header>

        <section className="d-flex justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex container-fluid flex-column mt-5">
              <div
                id="input_first_name"
                className="row mt-2 align-items-center bg-warning rounded"
              >
                <span className="col-3 ">Nombre</span>
                <input
                  autoComplete="off" //no permitir autocompletado del input
                  type="text"
                  className="form-control ms-2 col"
                  placeholder="first_name"
                  {...register("first_name", { required: true })} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div
                id="input_last_name"
                className="row mt-2 align-items-center bg-warning rounded"
              >
                <span className="col-3 ">Apellido</span>

                <input
                  autoComplete="off" //no permitir autocompletado del input
                  type="text"
                  className="form-control  ms-2 col"
                  placeholder="last_name"
                  {...register("last_name", { required: true })} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div
                id="input_age"
                className="row mt-2 align-items-center bg-warning rounded"
              >
                <span className="col-3 ">Edad</span>

                <input
                  autoComplete="off" //no permitir autocompletado del input
                  type="number"
                  className="form-control  ms-2 col"
                  placeholder="age"
                  {...register("age", { required: true })} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div
                id="input_lucky"
                className="row mt-2 align-items-center bg-warning rounded"
              >
                <span className="col-3 ">Nº suerte</span>

                <input
                  autoComplete="off" //no permitir autocompletado del input
                  type="text"
                  className="form-control  ms-2 col"
                  placeholder="lucky_numbers"
                  {...register("lucky_numbers", { required: true })} //crear el name del input y requerido react-hook-form
                />
              </div>
              <div id="input_btn" className="row my-4">
                <div className="d-inline-flex container justify-content-center">
                  <button className="btn btn-primary m-0" type="submit">
                    {" "}
                    enviar
                  </button>
                </div>
              </div>
            </div>
            {/* control de errores react-hook-form */}
            {errors.username && (
              <span className="text-danger text-small d-block m-2 fw-lighter">
                El campo no puede estar vacío
              </span>
            )}
            {errors.password && (
              <span className="text-danger text-small d-block m-2 fw-lighter">
                El campo no puede estar vacío
              </span>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default FormSignup;
