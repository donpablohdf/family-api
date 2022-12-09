const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      // Use getActions to call a function within a fuction
      dataFromAPI: async (url, destino) => {
        // para meter los datos de la API
        const store = getStore();
        if (!store.hasOwnProperty(destino)) {
          try {
            const resp = await fetch(process.env.BACKEND_URL + url);
            const data = await resp.json();
            if (destino !== "") {
              let llenar = {};
              llenar[destino] = data;
              setStore(llenar);
            }
            //console.log(data)
            return data;
          } catch (error) {
            return false;
          }
        } else {
          return store[destino];
        }
      },
      solicitudesAPI: async (url, meth, head, bod) => {
        const body = JSON.stringify(bod);
        //console.log(body)
        if (url === "/logout") {
          const token = localStorage.removeItem("jwt-token");
        }

        //console.log(url, meth, head, body);
        await fetch(process.env.BACKEND_URL + url, {
          method: meth,
          headers: head,
          body: body,
        })
          .then((resp) => resp.json())
          .then((data) => {
            //console.log(data[1])
            if (data.token) {
              localStorage.setItem("jwt-token", data.token);
            }
            //console.log(data)
            return data;
          })
          .catch((error) => {
            return "Hubo un problema con la petición Fetch:" + error.message;
          });
      },
    },
  };
};

export default getState;
