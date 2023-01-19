let favoritos = [];

document.addEventListener("DOMContentLoaded", () => {
  favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  mostrarFavoritos();
});

//                  Funcion para mostrar los restaurantes

const lista = document.querySelector("#listado");

const mostrarRestaurantes = async () => {
  const cargaJson = await fetch("./restaurantes.json");
  const datos = await cargaJson.json();

  datos.forEach((datos) => {
    const div = document.createElement("div");
    div.innerHTML = `
                   <div class="card text-bg-dark p-3 border border-white">
            <img src="${datos.img}}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h5 class="card-title">${datos.nombre}</h5>
                <p class="card-text">Tipo de comida: ${datos.tipoComida} </p>
                <p class="card-text">Dirección: ${datos.direccion}</p>
                <p class="card-text">Horario de apertura: ${datos.horarioApertura} </p>
                <p class="card-text">Consumición: ${datos.consumicion} </p>
                  
                <p id= "agregar${datos.id}" class="btn btn-light">Agregar a favoritos </p>
                
            </div>
        </div>
        
        `;
    lista.append(div);

    const botonFavoritos = document.getElementById(`agregar${datos.id}`);

    botonFavoritos.addEventListener("click", () => {
      agregarFavoritos(datos.id);
    });
  });
};

mostrarRestaurantes();

//          Funcion para agregar a favoritos

const agregarFavoritos = async (prodId) => {
  const cargaJson = await fetch("./restaurantes.json");
  const datos = await cargaJson.json();

  //          Condicional que revisa si hay un rest. dentro de favoritos === al que estamos intentando agregar.
  const existe = favoritos.some((prod) => prod.id === prodId);
  if (existe) {
    Swal.fire("Este restaurante ya está en tu lista de favoritos");
  } else {
    const restaurante = datos.find((prod) => prod.id === prodId);
    favoritos.push(restaurante);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Agregaste el restaurante a tus favoritos",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mostrarFavoritos();
  setLocalStorage();
};

const favoritosAgregados = document.getElementById("favoritos");

//                  Funcion para mostrar favoritos

const mostrarFavoritos = () => {
  favoritosAgregados.innerHTML = "";

  favoritos.forEach((datos) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card text-center text-bg-dark border border-warning">
        <div class="card-header">
            ${datos.tipoComida}
        </div>
        <div class="card-body">
            <h5 class="card-title">${datos.nombre}</h5>
            <p class="card-text">${datos.direccion}</p>
            <button onclick = "eliminarFavorito (${datos.id})"class="btn-delete btn btn-primary boton">Eliminar de mis favoritos</button>
        </div>
        <div class="card-footer text-bg-dark">
        ${datos.consumicion} - ${datos.horarioApertura}
        </div>
    </div>
    <br>
    `;

    favoritosAgregados.appendChild(div);
  });
};

//          Funcion para eliminar de favoritos

const eliminarFavorito = (prodId) => {
  const restaurante = favoritos.find((prod) => prod.id === prodId);
  const i = favoritos.indexOf(restaurante);
  favoritos.splice(i, 1);
  Swal.fire({
    title:
      "Estas seguro de que queres eliminar este restaurante de tu lista de favoritos??",
    text: "Tendrás que volver a agregarlo desde el incio",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarFavoritos();
      favoritos.splice(i, 0);
      Swal.fire(
        "Eliminado!",
        "Eliminaste el restaurante de tus favoritos.",
        "success"
      );
    }
  });
  setLocalStorage();
};

//                  Funcion para enviar mi lista de favoritos al local storage

function setLocalStorage() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

//                  Funcion para filtrar por Gourmet
const btnGourmet = document.querySelector("#btnGourmet");
const filtradoGourmet = document.querySelector("#filtradoGourmet");
btnGourmet.addEventListener("click", () => {
  filtradoGourmet.innerHTML = "";
  fetch("./restaurantes.json")
    .then((res) => res.json())
    .then((datos) => {
      gourmetFilter = datos.filter(
        (tipoComida) => tipoComida.tipoComida === "Gourmet"
      );

      lista.innerHTML = "";
      filtradoComidaRapida.innerHTML = "";
      filtradoRestaurant.innerHTML = "";

      gourmetFilter.forEach((datos) => {
        const div = document.createElement("div");
        div.innerHTML = `
                       <div class="card text-bg-dark p-3 border border-white">
                <img src="${datos.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${datos.nombre}</h5>
                    <p class="card-text">Tipo de comida: ${datos.tipoComida} </p>
                    <p class="card-text">Dirección: ${datos.direccion}</p>
                    <p class="card-text">Horario de apertura: ${datos.horarioApertura} </p>
                    <p class="card-text">Consumición: ${datos.consumicion} </p>
        
                    <p id= "agregar${datos.id}" class="btn btn-light">Agregar a favoritos </p>
                </div>
            </div>
            `;
        filtradoGourmet.append(div);
        const botonFavoritos = document.getElementById(`agregar${datos.id}`);

        botonFavoritos.addEventListener("click", () => {
          agregarFavoritos(datos.id);
        });
      });
    });
});

// Funcion para filtrar por Restaurante
const btnRestaurant = document.querySelector("#btnRestaurant");
const filtradoRestaurant = document.querySelector("#filtradoRestaurant");
btnRestaurant.addEventListener("click", () => {
  filtradoRestaurant.innerHTML = "";
  fetch("./restaurantes.json")
    .then((res) => res.json())
    .then((datos) => {
      gourmetFilter = datos.filter(
        (tipoComida) => tipoComida.tipoComida === "Restaurant"
      );

      lista.innerHTML = "";
      filtradoComidaRapida.innerHTML = "";
      filtradoGourmet.innerHTML = "";

      gourmetFilter.forEach((datos) => {
        const div = document.createElement("div");
        div.innerHTML = `
                       <div class="card text-bg-dark p-3 border border-white">
                <img src="${datos.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${datos.nombre}</h5>
                    <p class="card-text">Tipo de comida: ${datos.tipoComida} </p>
                    <p class="card-text">Dirección: ${datos.direccion}</p>
                    <p class="card-text">Horario de apertura: ${datos.horarioApertura} </p>
                    <p class="card-text">Consumición: ${datos.consumicion} </p>
        
                    <p id= "agregar${datos.id}" class="btn btn-light">Agregar a favoritos </p>
                </div>
            </div>
            `;
        filtradoRestaurant.append(div);
        const botonFavoritos = document.getElementById(`agregar${datos.id}`);

        botonFavoritos.addEventListener("click", () => {
          agregarFavoritos(datos.id);
        });
      });
    });
});

// Funcion para filtrar por ComidaRapida
const btnComidaRapida = document.querySelector("#btnComidaRapida");
const filtradoComidaRapida = document.querySelector("#filtradoComidaRapida");
btnComidaRapida.addEventListener("click", () => {
  filtradoComidaRapida.innerHTML = "";
  fetch("./restaurantes.json")
    .then((res) => res.json())
    .then((datos) => {
      gourmetFilter = datos.filter(
        (tipoComida) => tipoComida.tipoComida === "Comida rapida"
      );

      lista.innerHTML = "";
      filtradoRestaurant.innerHTML = "";
      filtradoGourmet.innerHTML = "";
      gourmetFilter.forEach((datos) => {
        const div = document.createElement("div");
        div.innerHTML = `
                       <div class="card text-bg-dark p-3 border border-white">
                <img src="${datos.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${datos.nombre}</h5>
                    <p class="card-text">Tipo de comida: ${datos.tipoComida} </p>
                    <p class="card-text">Dirección: ${datos.direccion}</p>
                    <p class="card-text">Horario de apertura: ${datos.horarioApertura} </p>
                    <p class="card-text">Consumición: ${datos.consumicion} </p>
        
                    <p id= "agregar${datos.id}" class="btn btn-light">Agregar a favoritos </p>
                </div>
            </div>
            `;
        filtradoComidaRapida.append(div);
        const botonFavoritos = document.getElementById(`agregar${datos.id}`);

        botonFavoritos.addEventListener("click", () => {
          agregarFavoritos(datos.id);
        });
      });
    });
});

//          Funcion para mostrar todos

const todos = document.querySelector("#todos");
todos.addEventListener("click", () => {
  lista.innerHTML = "";
  filtradoRestaurant.innerHTML = "";
  filtradoGourmet.innerHTML = "";
  filtradoComidaRapida.innerHTML = "";
  mostrarRestaurantes();
});


