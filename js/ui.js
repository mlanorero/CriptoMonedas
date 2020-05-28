class Interfaz {

    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                
                //crear un select de opciones
                const select = document.querySelector('#criptomoneda');
                //iterar por los resultados de la api
                for( const [key, value] of Object.entries(monedas.monedas.Data)) {
                    // añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                } 
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //mostrar contenidos
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        },3000);
    }

    //imprime el resultado de la cotización 
    mostrarResultado(resultado, moneda, crypto){

        // en caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div' );

        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }
        
        const datosMoneda = resultado[crypto][moneda];

        console.log(datosMoneda);

        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE*1000).toLocaleDateString('es-CL')


        //contruir el template

        let templateHTML= `
            <div class="card bg-warning">
                <div class="card-body text-ligth">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${precio} es de: $ ${datosMoneda.PRICE}</p>
                    <p>Variación del último día: % ${porcentaje}</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {

        //insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHTML;

        //oculatar el spinner
        this.mostrarOcultarSpinner('none');
       }, 3000);
    }
        //mostrar spinner de carga al enviar la cotización
        mostrarOcultarSpinner(vista) {
            const spinner = document.querySelector('.contenido-spinner')
            spinner.style.display = vista;
        
    } 
}