const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			dataFromAPI: async (url, destino) => {
				// para meter los datos de la API
				const store = getStore()
				if (!store.hasOwnProperty(destino)) {
					try {
						const resp = await fetch(process.env.BACKEND_URL + url)
						const data = await resp.json()
						let llenar = {}
						llenar[destino] = data
						setStore(llenar)
						console.log(data)
						return data
					} catch (error) {
						return false
					}
				} else {
					return store[destino]
				}

			}
		}
	};
};

export default getState;
