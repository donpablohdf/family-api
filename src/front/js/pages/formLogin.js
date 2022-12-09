import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";
import { useForm } from 'react-hook-form' // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

export const FormLogin = () => {

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm(); // declaracion para react-hook-form
    const { actions } = useContext(Context);
    let history = useNavigate()
    let login = false;
    const onSubmit = (data, e) => {
        e.preventDefault();
        // console.log(data)
        // console.log({ username: "admin", password: "1234" })
        const url = '/login'
        const method = 'POST'
        const head = { "Content-Type": "application/json" }
        //vendrá del formulario

        login = actions.solicitudesAPI(url, method, head, data)
        if (login) { history("/private") }
    }


    return (
        <div className="">

            <div className='container p-0 m-3 d-flex flex-column bg-light shadow'>
                <header className='d-flex justify-content-center mt-3'><h1 className='fw-lighter'>LOGIN</h1></header>
                <section className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="d-flex container-fluid flex-column mt-5">
                            <div id="input_username" className="row mt-2 align-items-center bg-warning rounded">
                                <span className='col-3 '>Usuario</span>
                                <input
                                    autoComplete="off" //no permitir autocompletado del input                      
                                    type="text"
                                    className='form-control ms-2 col'
                                    placeholder="Usuario"
                                    {...register("username", { required: true })} //crear el name del input y requerido react-hook-form
                                />
                            </div>
                            <div id="input_password" className="row mt-2 align-items-center bg-warning rounded">

                                <span className='col-3 '>Password</span>

                                <input
                                    autoComplete="off" //no permitir autocompletado del input                      
                                    type="text"
                                    className='form-control  ms-2 col'
                                    placeholder="Password"
                                    {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
                                />
                            </div>
                            <div id='input_btn' className="row my-4">
                                <div className='d-inline-flex container justify-content-center'>
                                    <button className='btn btn-primary m-0' type="submit" > enviar</button>
                                </div>
                            </div>
                        </div>
                        {/* control de errores react-hook-form */}
                        {errors.username && <span className="text-danger text-small d-block m-2 fw-lighter">El campo no puede estar vacío</span>}
                        {errors.password && <span className="text-danger text-small d-block m-2 fw-lighter">El campo no puede estar vacío</span>}
                    </form>
                </section>
            </div>
        </div>
    )
}