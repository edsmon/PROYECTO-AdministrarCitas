import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from "./selectores.js";


// instanciacion
const ui = new UI();
const administrarCitas = new Citas();

let editando;

// -----------------  Objeto principal -----------------

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// ---------------- Funciones ----------------

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

export function nuevaCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.mostrarAlerta('Los campos son obligatorios', 'error');
        return
    }

    if (editando) {
        ui.mostrarAlerta('Editado correctamente');
        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({ ...citaObj });
        // reresar boton a estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        editando = false;

    } else {

        citaObj.id = Date.now(); //Creando un id unico para utilizar como identificador

        administrarCitas.agregarCita({ ...citaObj });//se toma una copia del objeto, no la copia de la ref del objeto

        ui.mostrarAlerta('Se agrego correctamente');
    }

    reiniciarObjeto();

    formulario.reset();

    ui.imprimirCitas(administrarCitas);
}


export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {

    administrarCitas.eliminarCita(id);

    ui.mostrarAlerta('La cita se elimino correctamente');

    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}
