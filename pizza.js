

const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "pizza.json"
/*window.addEventListener("load", function () {
 

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
}
)
*/
function procesarRespuesta(jsonDoc) {
    //Convertimos un texto a un objeto JSON
   
    objetoJson = JSON.parse(jsonDoc)
    //Podemos hacer lo contrario con "JSON.stringify(obj)"ç

    var arrayTamaños = objetoJson.PIZZAS.TAMAÑOS

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


    var arrayIngredientes = objetoJson.PIZZAS.INGREDIENTES

    for (let cadaingrediente of arrayIngredientes) {


        opcioningrediente = document.createElement("input")
        opcioningrediente.type = "checkbox"
        opcioningrediente.id = cadaingrediente.nombre
        opcioningrediente.name = "ingrediente"
        opcioningrediente.value = cadaingrediente.precio
    
        ingredientesPizza.appendChild(opcioningrediente)
    
        var labelingrediente = document.createElement("label")
        var txtlabelingrediente = document.createTextNode(cadaingrediente.nombre + " - precio : " + cadaingrediente.precio + "$")
        labelingrediente.appendChild(txtlabelingrediente)
        ingredientesPizza.appendChild(labelingrediente)
    
        var br = document.createElement("br")
        ingredientesPizza.appendChild(br)
    }


}


window.onload = function() {

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
    
    
    recargarDatosForm.onclick = function () {

        tamañoPizza.innerHTML = ""
        ingredientesPizza.innerHTML = ""
        precioResultado.innerHTML = ""
        procesarRespuesta(xmlHttp.responseText)
   

   
    }
    
    procesarPedidoFinal.addEventListener("click", calcularPrecio)

        
        


    }


function calcularPrecio() {


   
    
    let bases = document.getElementsByName("tamaño")
    let preciobasetotal = 0
    for (let cadabase of bases) {
    
    if (cadabase.checked) {

        baseparseada = parseFloat(cadabase.value)  
        preciobasetotal = baseparseada
    }
   
    }
    let ingredientes = document.getElementsByName("ingrediente")
    
    let precioingredientestotal = 0
    for (let cadaingrediente of ingredientes) {
    
    if (cadaingrediente.checked) {

        

        ingredienteparseado = parseFloat(cadaingrediente.value)
        precioingredientestotal += ingredienteparseado
        
    }
    
    }
    let precioFinalTotal;
    precioFinalTotal = preciobasetotal + precioingredientestotal
    let textoPrecioFinal = "El precio final del pedido es de : " + precioFinalTotal + " €"
    
    precioResultado.innerHTML = textoPrecioFinal
}










