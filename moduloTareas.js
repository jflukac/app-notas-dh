let fs = require ('fs');

let moduloTareas = {
    traerArrayDeTareas : function() {
        let listaDeTareas = fs.readFileSync('tareas.json', 'UTF-8');
        return JSON.parse(listaDeTareas)
    },
    crearNuevaTarea: function(tarea) {
        let listaParseada = this.traerArrayDeTareas();
        let soloTitulos = []
        listaParseada.forEach(function(elemento){
            soloTitulos.push(elemento.titulo)
        })
        if (soloTitulos.includes(tarea.titulo) == true) {
            return console.log('Esta tarea ya existe, por favor ponga otro nombre o eliminela.')
        }
        listaParseada.push(tarea)
        let listaComoJSON = JSON.stringify (listaParseada);
        fs.writeFileSync ('tareas.json', listaComoJSON);
        return 'Se creó exitosamente la tarea ' + tarea.titulo + ' cuyo estado es ' + tarea.estado
    },
    filtrarPor : function(Estado) {
        let listaParseada = moduloTareas.traerArrayDeTareas();
        let listaFiltrada = listaParseada.filter(function(tarea){
            return tarea.estado == Estado;
        })
        return listaFiltrada
    },
    eliminar : function (tituloTarea) {
        let listaParseada = moduloTareas.traerArrayDeTareas();
        let listaFiltrada = listaParseada.filter(function(tarea){
            return tarea.titulo != tituloTarea;
        })
        let listaComoJSON = JSON.stringify (listaFiltrada);
        fs.writeFileSync ('tareas.json', listaComoJSON);
    },
    modificarEstado : function (tituloModificar, nuevoEstado) {
        this.eliminar(tituloModificar);
        let tareaModificada = {
            titulo: tituloModificar,
            estado: nuevoEstado
        }
        this.crearNuevaTarea (tareaModificada)
        return console.log('Se modificó exitosamente el estado de la tarea ' + tareaModificada.titulo + ' a ' + tareaModificada.estado)
    },
    modificarTitulo : function (tituloModificar, nuevoTitulo) {
        let listaParseada = this.traerArrayDeTareas();
        let soloTitulos = []
        listaParseada.forEach(function(elemento){
            soloTitulos.push(elemento.titulo)
        })
        let index = soloTitulos.indexOf(tituloModificar)
        let estadoPrevio = listaParseada[index].estado
        this.eliminar(tituloModificar);
        let tareaModificada = {
            titulo: nuevoTitulo,
            estado: estadoPrevio
        }
        this.crearNuevaTarea (tareaModificada)
        return console.log('Se modificó exitosamente la tarea ' + tareaModificada.titulo + ' cuyo estado es ' + tareaModificada.estado)
    }
}

module.exports = moduloTareas;