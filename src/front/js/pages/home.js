import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Home = () => {
	const [itemsMenu, setItemsMenu] = useState(["Cargando"])

	const { store, actions } = useContext(Context);


	useEffect(() => {
		// Pido a éste una promesa
		if (!store.hasOwnProperty("members")) { //comprueba si existe en el store
			const cumplePromesa = () => {
				return new Promise((resolve, reject) => {
					resolve(actions.dataFromAPI('/members', 'members')) // prometo que traigo datos del obj
				})
			}
			cumplePromesa().then((datos) => { 
				setItemsMenu(datos)
				

			}
			)
		} else {

			setItemsMenu(store.members)
		}
	}, [])
	console.log(itemsMenu)

	return (
		<>

			<div className="me-2">

				<div className="d-inline-flex shadow ms-3 mt-3">
					<ul className="dropdown-menu dropdown-menu-dark d-block position-static shadow w-220px">
						{itemsMenu.map(
							(opcion, index) =>
								<li key={index} className="d-flex justify-content-betweenp-0 m-0">

									<Link className="dropdown-item d-flex gap-2 align-items-end ps-4 py-4" to={"/member/" + opcion.id}>
										{/* <i class='fab fa-galactic-republic ms-1 p-0'></i> */}
										{opcion.last_name}
									</Link>
								</li>
						)}

					</ul>

				</div>

			</div>

		</>
	)

};
