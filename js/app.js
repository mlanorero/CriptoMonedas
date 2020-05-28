const cotizador = new API('2e1c0687201bad6b0dd322d50ba3962614b3a73dd3ce2d38559c0714e4d6604e');
const ui = new Interfaz();





//leer el formulario

const formulario = document.querySelector('#formulario');
//evenlistener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    //leer la cristomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#moneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    
    // comprobar que ambos campos tengan algo seleccionado
    
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        // arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        // todo bien, consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            })
    }
    
})