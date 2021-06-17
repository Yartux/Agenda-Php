const formularioContactos = document.querySelector('#contacto'),
    numeroDeContactosDom = document.querySelector('.total-contactos span'),
    darkmodeBtn = document.querySelector('#darkmode'),
    body = document.querySelector('body'),
    inputBuscador = document.querySelector('#buscar');

let btnsEliminar = document.querySelectorAll('.btn-borrar'),
    listado = document.querySelector('.listado-contactos tbody');

darkmode();
eventListeners();
msjInformadorDeCantidadContactosNula();

function eventListeners() {
    //Cuando el formulario crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
    //Añade la funcion a los botones eliminar
    if (btnsEliminar.length != 0) {
        btnsEliminar.forEach(btn => {
            btn.addEventListener('click', () => eliminarBd(btn.getAttribute('data-id')));
        });
    }
    // buscador
    inputBuscador.addEventListener('input', buscarContactos);

}

function darkmode() {
    loadDarkMode();
    /* modo oscuro */
    darkmodeBtn.addEventListener('click', e => {
        /* tooglea la clase */
        body.classList.toggle('darkmode');
        /* guarda en almacenamiento local */
        storeDarkMode(body.classList.contains('darkmode'));
    });
}

function loadDarkMode() {
    const darkmode = localStorage.getItem('darkmode');
    if (!darkmode) {
        storeDarkMode(false);
    } else if (darkmode == 'true') {
        body.classList.add('darkmode');
    }
}

function storeDarkMode(value) {
    localStorage.setItem('darkmode', value);
}

function leerFormulario(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value.trim();
    const empresa = document.querySelector('#empresa').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const accion = document.querySelector('#accion').value;

    if (nombre == '' || empresa == '' || telefono == '') {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //pasa la validacion
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
        if (document.querySelector('#idcontacto')) {
            infoContacto.append('id', document.querySelector('#idcontacto').value);
        }
        if (accion == 'crear') {
            //crear elemento
            insertarBd(infoContacto);

        } else if (accion == 'editar') {
            /* editar el contacto */
            editarBd(infoContacto);
        }

    }
}

//Inserta en la Bd vía Ajax
function insertarBd(datos) {
    //Llamado a ajax
    //crear objeto
    const xhr = new XMLHttpRequest();
    //abrir conex
    xhr.open('post', 'inc/modelos/modelo-contacto.php', true);
    //pasar datos
    xhr.onload = function () {
        if (this.status === 200) {
            const res = JSON.parse(xhr.responseText);

            /* creo los datos del contacto */
            let nuevoContacto = document.createElement('tr');
            nuevoContacto.setAttribute('id', 'contactoTr' + res.datos.id);
            nuevoContacto.innerHTML = `
            <td>${res.datos.nombre}</td>
            <td>${res.datos.empresa}</td>
            <td>${res.datos.telefono}</td>
            `;

            /* creo la columna de botones */
            const contenedorAcciones = document.createElement('td');

            /* creo el boton editar */
            const iEditar = document.createElement('i');
            iEditar.classList.add('fas', 'fa-pencil-alt');
            /* creo el elemento "a" para añadirle el hijo btn */
            const aEditar = document.createElement('a');
            aEditar.setAttribute('href', `editar.php?id=${res.datos.id}`);
            aEditar.setAttribute('style', `padding-right: 8px`);
            aEditar.classList.add('btn-editar', 'btn');
            aEditar.appendChild(iEditar);

            /* creo el boton borrar */
            const iBorrar = document.createElement('i');
            iBorrar.classList.add('fas', 'fa-trash-alt');
            /* creo el elemento "a" para añadirle el hijo btn */
            const btnBorrar = document.createElement('button');
            btnBorrar.setAttribute('data-id', `${res.datos.id}`);
            btnBorrar.classList.add('btn-borrar', 'btn');
            btnBorrar.appendChild(iBorrar);

            /* añado botones al contenedor */
            contenedorAcciones.appendChild(aEditar);
            contenedorAcciones.appendChild(btnBorrar);
            nuevoContacto.appendChild(contenedorAcciones);

            /* los inserto en el html en el body */
            listado.appendChild(nuevoContacto);
            /* Refresco variables y eventos para que los botones nuevos funcionen */
            listado = document.querySelector('.listado-contactos tbody');
            btnsEliminar = document.querySelectorAll('.btn-borrar');
            eventListeners();
            /* mostrar notificación */
            mostrarNotificacion('Contacto Creado Correctamente', 'correcto');

            /* actualizar contador */
            numeroContactos();
            msjInformadorDeCantidadContactosNula();
        }
    }
    //enviar dtos
    xhr.send(datos)
}

//Edita en la Bd vía Ajax
function editarBd(datos) {
    //Llamado a ajax
    //crear objeto
    const xhr = new XMLHttpRequest();
    //abrir conex
    xhr.open('post', 'inc/modelos/modelo-contacto.php', true);
    //pasar datos
    xhr.onload = function () {
        if (this.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.editado) {
                location.href = '/agenda/';
            }
        }
    }
    //enviar dtos
    xhr.send(datos)
}

/* Elimina en la bd vía ajax */
function eliminarBd(contactoId) {
    const contacto = new FormData();
    contacto.append('id', contactoId);
    contacto.append('accion', 'borrar');
    //Llamado a ajax
    //crear objeto
    const xhr = new XMLHttpRequest();
    //abrir conex
    xhr.open('post', 'inc/modelos/modelo-contacto.php', true);
    //pasar datos
    xhr.onload = function () {
        if (this.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.borrado) {
                listado.removeChild(document.querySelector('#contactoTr' + contactoId));
                numeroContactos();
                msjInformadorDeCantidadContactosNula();
            }
        }
    }
    //enviar dtos
    xhr.send(contacto)
}

//notificacion en pantalla
function mostrarNotificacion(text, clase) {
    const notificacion = document.createElement('div');
    notificacion.textContent = text;
    notificacion.classList.add('notificacion', clase, 'sombra');
    /* formulario */
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    /* mostrar y ocultar */
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500)
        }, 2500)
    }, 100)
}

function msjInformadorDeCantidadContactosNula() {
    if (numeroDeContactosDom.textContent.trim() === "0") {
        const nohay = document.createElement('tr');
        nohay.setAttribute('id', 'sinContactos');
        const tr = document.createElement('td');
        tr.textContent = 'Añada contactos para poder visualizarlos';
        tr.setAttribute('colspan', "4");
        tr.classList.add('center', 'sincontactos');
        nohay.appendChild(tr);
        listado.appendChild(nohay);
    } else {
        const nohay = document.querySelector('#sinContactos');
        if (nohay) {
            listado.removeChild(nohay);
        }
    }
}

function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;
    totalContactos.forEach(contacto => {
        if ((contacto.style.display === '' || contacto.style.display === 'table-row') && contacto.getAttribute('id') != 'sinContactos') {
            total++;
        }
    });

    // console.log(total);
    contenedorNumero.textContent = total;
}

/** Buscador de registros */
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i" );
          registros = document.querySelectorAll('tbody tr');

          registros.forEach(registro => {
               registro.style.display = 'none';

               if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
                    registro.style.display = 'table-row';
               }
               numeroContactos();
          })
}