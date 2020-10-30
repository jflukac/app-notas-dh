// Requerimos el módulo 'process'
const { kMaxLength } = require('buffer');
let process = require ('process');
let moduloTareas = require ('./moduloTareas')

//Capturamos el comando que el usuario ingresó por consola
let comandoDelUsuario = process.argv[2];

switch (comandoDelUsuario) {

    case 'listar':
        //dar el listado de tareas
        let listaParseada = moduloTareas.traerArrayDeTareas();
        listaParseada.forEach(function (elemento , posicion) {
            console.log(`${elemento.titulo} - ${elemento.estado}`);
        });
        break;

    case 'crearTarea':
        //crear una tarea
        //Si no hay título de tarear tirar un error
        let tituloTarea = ''
        if (process.argv[3] == undefined) {
            throw new Error ('No se ingreso un título para la tarea')
        } else {
            tituloTarea = process.argv[3]
        }
        //Si no se ingreso un estado de tarea poner 'pendiente' como predeterminada
        let estadoTarea = process.argv[4] == undefined ? 'pendiente' : process.argv[4]

        let tarea = {
            titulo: tituloTarea,
            estado: estadoTarea
        }
        console.log( moduloTareas.crearNuevaTarea(tarea))
        break;

    case 'filtrarPor':
        //filtra las tareas
        let estado = process.argv[3];
        let listaFiltrada = moduloTareas.filtrarPor(estado)
        listaFiltrada.forEach(function (elemento) {
            console.log(`${elemento.titulo} - ${elemento.estado}`);
        });
        break;

    case 'eliminar':
        //como eliminar una tarea.
        let tareaEliminar = process.argv[3];
        moduloTareas.eliminar(tareaEliminar);
        break;

    case 'modificarEstado':
        //como modificar el estado de una tarea.
        let tituloModificar = process.argv[3];
        let nuevoEstado = process.argv[4];
        moduloTareas.modificarEstado(tituloModificar, nuevoEstado);
        break;
    case 'modificarTitulo':
        //como modificar el estado de una tarea.
        let modificarTitulo = process.argv[3];
        let nuevoTitulo = process.argv[4]
        moduloTareas.modificarTitulo(modificarTitulo, nuevoTitulo);
        break;

    case 'help':
        //Instructivo de como funciona la app.
        console.log( "Esta app admite 6 funciones que se deben invocar de la siguiente manera: \n\t1. Listado de tareas --> node app.js listar \n\t2. Crear una nueva tarea --> node app.js crearTarea \'Nombre de la nueva tarea\' \'Estado de la tarea (por defecto es \'pendiente\')\' \n\t3. Filtrar tareas por estado --> node app.js filtrarPor \'pendiente\' \'finalizada\' \n\t4. Modificar el estado de una tarea--> node app.js modificarEstado \'Titulo de la tarea\' \'Nuevo estado\' \n\t5. Modificar el titulo de una tarea --> node app.js modificarTitulo \'titulo actual de la tarea\' \'nuevo titulo de la tarea\' \n\t6. Eliminar una tarea --> node app.js eliminar \'Titulo de la tarea a eliminar\'")
        break;

    case 'undefined':
        console.log( 'Debes ingresar una acción. Para obtener ayuda ingresa --> node app.js help' )
        break;

    default:
        console.log('Para obtener ayuda de como usar la app ingrese --> node app.js help')
        
}