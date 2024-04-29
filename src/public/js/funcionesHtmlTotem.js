

// Define la función creaNumeroYMuestraMensaje
function creaNumeroYMuestraMensaje(id) {
  let url = '/totem/?id=' + id;

  $.ajax({
      url: url,
      type: 'POST',
      success: function (data) {
          //que muestre un alert de swal la info que tiene data
          console.log(data);
          
          const turnoCreado = data[0];
          const mensaje = `<h2> ${turnoCreado.primera_letra}${turnoCreado.ultima_letra}-${turnoCreado.id} </h2> <h3 class="text-muted"> Numero generado </h3>  <br> <h4 class="text-muted"> ${turnoCreado.fechaf} - ${turnoCreado.hora} </h4>  <br>  `;
          

          Swal.fire({
            icon: 'success',
            html: mensaje,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            }
          })
      },
      error: function (data) {
          console.log(data);
          showBootstrapToast("Error", "No se pudo eliminar el ejercicio", 5000, "bg-danger");
      }
  });
}


function formatearFecha(fecha) {
  // Crea un objeto Date a partir de la cadena de fecha
  const fechaObj = new Date(fecha);

  // Obtiene el día, mes y año de la fecha
  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque en JavaScript los meses van de 0 a 11
  const año = fechaObj.getFullYear();

  // Formatea la fecha como "DD/MM/AAAA"
  const fechaFormateada = `${dia}/${mes}/${año}`;

  return fechaFormateada;
}