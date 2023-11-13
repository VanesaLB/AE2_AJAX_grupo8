

/**
 * Esta función se va a encargar de recoger el .responseText de una petición XMLHttpRequest 
 * y usar los datos que le vengan para modificar el arbol DOM de la pagina html principal
 */


function procesarRespuesta(jsonDoc) {

    /**
     * Convertimos el XMLHttpRequest.responseText que nos llegue a un objeto JSON
     */
    objetoJson = JSON.parse(jsonDoc)
    // EXTRA: Podemos hacer lo contrario con "JSON.stringify(obj)"ç


    /**
     * Creamos un array con los diferentes objetos dentro del array "TAMAÑOS" del objeto
     * JSON que tenemos en memoria
     */
    var arrayTamaños = objetoJson.PIZZAS.TAMAÑOS


    /**
     * En este for lo que hacemos es recorrernos el array "TAMAÑOS" y con cada valor creamos un
     * input radio con su correspondiente label y los vamos haciendo hijos del div con id="tamañoPizza"
     * de la pagina html principal
     */
    for (let cadatamaño of arrayTamaños) {



        opciontamaño = document.createElement("input")
        opciontamaño.type = "radio"
        opciontamaño.id = cadatamaño.tamaño
        opciontamaño.name = "tamaño"
        opciontamaño.value = cadatamaño.precio



        tamañoPizza.appendChild(opciontamaño)

        var labeltamaño = document.createElement("label")
        var txtlabeltamaño = document.createTextNode(cadatamaño.tamaño + " - precio : " + cadatamaño.precio + "$")

        labeltamaño.appendChild(txtlabeltamaño)
        tamañoPizza.appendChild(labeltamaño)

        var br = document.createElement("br")
        tamañoPizza.appendChild(br)

    }

    /**
     * Creamos un array con los diferentes objetos dentro del array "TAMAÑOS" del objeto
     * JSON que tenemos en memoria 
     */

    var arrayIngredientes = objetoJson.PIZZAS.INGREDIENTES

    /**
     * En este for lo que hacemos es recorrernos el array "INGREDIENTES" y con cada valor creamos un
     * input checkbox con su correspondiente label y los vamos haciendo hijos del div con id="ingredientesPizza"
     * de la pagina html principal
     */
    for (let cadaingrediente of arrayIngredientes) {


        opcioningrediente = document.createElement("input")
        opcioningrediente.type = "checkbox"
        opcioningrediente.id = cadaingrediente.nombre
        opcioningrediente.name = "ingrediente"
        opcioningrediente.value = cadaingrediente.precio

        ingredientesPizza.appendChild(opcioningrediente)

        var labelingrediente = document.createElement("label")
        var txtlabelingrediente = document.createTextNode(cadaingrediente.nombre + " - precio : " + cadaingrediente.precio + "€")
        labelingrediente.appendChild(txtlabelingrediente)
        ingredientesPizza.appendChild(labelingrediente)

        var br = document.createElement("br")
        ingredientesPizza.appendChild(br)
    }


}


/**
 * Esta función se va a encargar de identificar que campos del input radio y de los checkboxs
 * tenemos seleccionados (.checked) y en función de eso, sumar sus value, el resultado devuelto
 * será el precio total de la pizza
 */
function calcularPrecio() {




    let bases = document.getElementsByName("tamaño")
    let preciobasetotal = 0

    /**
     * Este for se encarga de recorrer el array formado por todos los input radio con name="tamaño"
     * y recoger el valor del value del que esté seleccionado (.checked)
     */
    for (let cadabase of bases) {

        if (cadabase.checked) {

            baseparseada = parseFloat(cadabase.value)
            preciobasetotal = baseparseada
        }

    }

    let ingredientes = document.getElementsByName("ingrediente")
    let precioingredientestotal = 0

    /**
     * Este for se encarga de recorrer el array formado por todos los input checkbox con name="ingrediente"
     * y recoger el valor del value de los que estén seleccionados (.checked) y sumarlos entre si con
     * un acumulador
     */

    for (let cadaingrediente of ingredientes) {

        if (cadaingrediente.checked) {



            ingredienteparseado = parseFloat(cadaingrediente.value)
            precioingredientestotal += ingredienteparseado

        }

    }

    /**
     * La variable precioFinalTotal contendrá la suma del value del input radio seleccionado 
     * y de las sumas de los input checkout seleccionados
     */
    let precioFinalTotal;
    precioFinalTotal = preciobasetotal + precioingredientestotal
    let textoPrecioFinal = "El precio final del pedido es de : " + precioFinalTotal + " €"

    /**
     * Añadimos al div con id="precioDelPedido" el texto que nos informa del precio final de la pizza
     */

    precioDelPedido.innerHTML = textoPrecioFinal
}

/**
 * Esta funcion se encarga de asegurarse que todos los campos del formulario contienen información
 * o en las multiopciones hay al menos 1 seleccionada. Si esto no se cumple, se lanza una alerta 
 * distinta dependiendo de cual sea la información que no esté completa y la funcion devuelve false 
 * 
 * @returns true en caso de que todas las condiciones para que el formulario sea valido se cumplan
 * y false en caso de que alguna condición para que el formulario sea valido no se cumpla
 */

function valicacion() {


    if (nombre.value == "") {
        alert("El campo nombre no puede estar vacio.");
        return false

    }

    if (direccion.value == "") {
        alert("El campo direccion no puede estar vacio.");
        return false

    }

    if (telefono.value == "") {
        alert("El campo telefono no puede estar vacio.");
        return false

    }

    if (email.value == "") {
        alert("El campo email no puede estar vacio.");
        return false

    }

    arrayTamañoValidacion = document.getElementsByName("tamaño")
    let tamañoElegido = []

    for (let tm of arrayTamañoValidacion) {

        if (tm.checked)
            tamañoElegido.push(tm)

    }

    if (tamañoElegido.length == 0) {
        alert("Debes seleccionar un tamaño de pizza.");
        return false

    }

    arrayIngredienteValidacion = document.getElementsByName("ingrediente")
    let ingredientesElegidos = []

    for (let ie of arrayIngredienteValidacion) {

        if (ie.checked)
            ingredientesElegidos.push(ie)

    }

    if (ingredientesElegidos.length == 0) {
        alert("Debes seleccionar al menos 1 ingrediente.");
        return false

    }
    return true
}

/**
 * Creamos 2 constantes que usaremos posteriormente
 */
const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "pizza.json"

/**
 * El window.onload lo usamos para que todo lo que se encuentra dentro de él se ejecute
 * cuando toda la página html haya cargado por completo
 * 
 * 1) Dentro del window.onload vamos a crear una peticion XMLHttpRequest para traernos la informacion
 * de un JSON que se encuentra en servidor, parsear sus datos para crearnos un objeto JSON y 
 * utilizarlo para pasarselo a la funcion procesarRespuesta(jsonDoc) y esta se encargará de 
 * elegir los datos que necesite del JSON y usarlos para insertar información en la pagina html
 * principal
 * 
 * 2) Además vamos a darle funcionalidad a 2 botones el html
 * 
 * 2.1) Al primero, con id="recargarDatosForm" vamos a darle la funcionalidad .onclick, la cual
 * se encargará de que cuando se pulse este boton, se restableceran todos los campos del formulario
 * para que podamos introducirlos de nuevo, y se le asignará a los div que tenian informacion gracias
 * a la peticion XMLHttpRequest, el valor de "". 
 * Además se volverá a ejecutar la peticion XMLHttpRequest y se cargaran de nuevo ciertas partes del html, 
 * y como los div estan vacios gracias a la asignacion de "" anterior, 
 * la pagina no sufre ninguna duplicacion de informacion
 * 
 * 2.2) Al segundo, con id="procesarPedidoFinal" vamos a darle la funcionalidad .onclick, la cual
 * se encargará de que cuando se pulse este boton, si la funcion validacion() devuelve true, se 
 * ejecutara la funcion calcularPrecio(), y si devuelve false, se habrá lanzado alguna alert 
 * por pantalla, indicandonos que hay algun campo obligatorio del formulario sin rellenar
 * 
 */
window.onload = function () {


    /**
     * En esta parte realizamos la peticion XMLHttpRequest
     */
    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)//Obtenemos el valor en texto
            } else {
                alert("ZASCA!")
            }
        }
    }

    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)


    /**
     * En esta parte le damos la funcionalidad al primer button
     */

    recargarDatosForm.addEventListener("click", function () {

        tamañoPizza.innerHTML = ""
        ingredientesPizza.innerHTML = ""
        precioDelPedido.innerHTML = ""
        nombre.value = ""
        direccion.value = ""
        telefono.value = ""
        email.value = ""
        procesarRespuesta(xmlHttp.responseText)

    })

    /**
     * En esta parte le damos la funcionalidad al segundo button
     */
    procesarPedidoFinal.addEventListener("click", function () {

        if (valicacion())
            calcularPrecio()
    })

}









