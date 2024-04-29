var turnoModal = document.getElementById('turnoModal')
turnoModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget
  // Extract info from data-bs-* attributes
  let numeroDeTicket = button.getAttribute('data-bs-numero')
  let id = button.getAttribute('data-bs-id')
  let inputId = turnoModal.querySelector('#id_turno_modal')
  inputId.value = id
  // modifica el onclick del boton de atender y ponele esta informacion concatenandole el id onclick="peticionAjax('/agenda/entaller?id={{this.id_agenda}}','GET','true','true')"
  let botonAtender = turnoModal.querySelector('.llamarnumero')
  botonAtender.setAttribute('onclick', `peticionAjax('/turnero/mostrarPantalla?numero=${numeroDeTicket}&puesto="PUESTO 1"','GET','false','false')`)
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  let inputTextNumero = turnoModal.querySelector('#turnoTexto')
  inputTextNumero.value = numeroDeTicket
})

