//FRONT
const socket = io();

// ...
socket.on("muestraTurnos", (data) => {
  let turno = data.data;

  if (window.location.href.includes("consulta")) {
    // Obtener la referencia al elemento HTML con el ID "pantallaturno"
    let lista = document.getElementById("pantallaturno");

    // Agregar contenido HTML al principio de la lista
    lista.innerHTML = `<tr>
        <td>
            <div class="d-flex px-2 py-1">
            <div class="d-flex flex-column justify-content-center">
                <h2>${turno.numero}</h2>
            </div>
            </div>
        </td>
        <td>
            <div class="d-flex px-2 py-1">
            <div class="d-flex flex-column justify-content-center">
                <h2>${turno.puesto}</h2>
            </div>
            </div>
        </td>
    </tr>` + lista.innerHTML;
    // Reproducir el sonido
    ring("sonido.mp3");
  }
});
// ...

  

socket.on("agregarFila", (data) => {
  let turno = data;
  console.log(turno);

  // si la url contiene turnero, entonces se está en la página del turnero
  if (window.location.href.includes("turnero")) {
 
    // Crea un Swal.fire que se muestre arriba a la derecha con el número de turno.
    swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Turno: ${turno[0].primera_letra}${turno[0].ultima_letra}${turno[0].id}`,
        showConfirmButton: false,
        timer: 3000
    });

    // Recarga personas atendidas también.

    let tabla = document.getElementById("table-proximo");
    // Borra el td si no tiene datos
    let td = document.getElementsByClassName("dataTables_empty")[0];
    if (td) {
        td.remove();
    }

    // Agrega contenido HTML al principio de la tabla
    tabla.insertAdjacentHTML("afterbegin", `<tr data-bs-id="${turno[0].id}" data-bs-numero="${turno[0].primera_letra}${turno[0].ultima_letra}-${turno[0].id}" data-bs-toggle="modal" data-bs-target="#turnoModal" >
        <td>
            <h6 class="mb-0 text-sm">${turno[0].primera_letra}${turno[0].ultima_letra}-${turno[0].id}</h6>
            <p class="text-xs text-secondary mb-0">${turno[0].nombretramite}</p>
        </td>
        <td>
            <p class="mb-0 text-sm">${turno[0].fechaf}</p>
            <p class="text-xs text-secondary mb-0">${turno[0].hora}</p>
        </td>
        <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success">${turno[0].nombreestado}</span>
        </td>
        <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${turno[0].requisitos}</span>
        </td>
    </tr>`);
    let turnostotal = document.getElementById("turnostotal");
    let turnoshoy = document.getElementById("turnoshoy");
    //ahora agregale 1 a la cantidad de turnos
    turnostotal.innerHTML = parseInt(turnostotal.innerHTML) + 1;
    

  }
});



