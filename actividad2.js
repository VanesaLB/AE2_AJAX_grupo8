/*
    //Creamos nodo tipo elemento
    let labelTamano = document.createElement("label");
    //Crear nodo de tipo Text para el label
    let contentTamano = document.createTextNode("Tamaños: ");
    //Añadir el nodo Text como hijo del nodo Element
    labelTamano.appendChild(contentTamano);
    //Añadir atributo for
    //labelTamano.for = "tamano";
    //let formulario = document.getElementsByTagName()
    //Añadir el nodo Element como hijo del div cuyo id = "tamanos"
    document.getElementById("tamanos").appendChild(labelTamano);
 */   

//Intento Estefanía
/*
const URL_DESTINO = "http://localhost:5500/AE2_AJAX/"; 
const RECURSO = "pizza.json"; 

function cargarDatosDesdeJSON(url, callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(this.responseText);
            } else {
                alert("Error al cargar los datos desde el servidor.");
            }
        }
    };

    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
}

function cargarPagina() {
    cargarDatosDesdeJSON(URL_DESTINO + RECURSO, function (data) {
        const datos = JSON.parse(data);
        cargarTamanos(datos.tamanos);
        cargarIngredientes(datos.ingredientes);
    });
}*/


window.addEventListener("load", function () {
    // Realizo una solicitud AJAX para obtener los datos del servidor de la forma que nos ha enseñado felix no lo consigo
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "actividad2.json", true); 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const data = JSON.parse(xmlhttp.responseText);
            cargarTamanos(data.tamanos);
            cargarIngredientes(data.ingredientes);
        }
    };
    xmlhttp.send();
});

//Intento VANESA
/*
const URL_DESTINO = "http://localhost:5501/AE2_AJAX_GRUPO8/" //http://127.0.0.1:5501/
const RECURSO = "actividad2.json"

    function cargarDatosDesdeJSON() {

        let xmlHttp = new XMLHttpRequest()

        xmlHttp.onreadystatechange = function () {
            console.log(this.readyState)
            if (this.readyState == 4) {
                if (this.status == 200) {
                    cargarPagina(this.responseText);//Obtenemos el valor en texto
                } else {
                    alert("Error al cargar los datos desde el servidor.")
                }
            }
        }

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
    }

    function cargarPagina() {
        cargarDatosDesdeJSON(URL_DESTINO, function (data) {
            const datos = JSON.parse(data);
            cargarTamanos(datos.tamanos);
            cargarIngredientes(datos.ingredientes);
        });
    }
*/

// Función para cargar tamaños dinámicamente
function cargarTamanos(tamano) {
    const tamanosDiv = document.getElementById("tamanos-pizza");
    tamano.forEach((tamano) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "tamano";
        radio.value = tamano.precio;
        radio.required = true;

        const label = document.createElement("label");
        label.setAttribute("for", tamano.id);
        label.textContent = `${tamano.nombre} - ${tamano.precio}€`;//expandir variable

        tamanosDiv.appendChild(radio);
        tamanosDiv.appendChild(label);
        tamanosDiv.appendChild(document.createElement("br"));
    });

    tamanosDiv.appendChild(document.createElement("br"));//He añadido este br
}

// Función para cargar ingredientes dinámicamente
function cargarIngredientes(ingredientes) {
    const ingredientesDiv = document.getElementById("ingredientes-pizza");
    ingredientes.forEach((ingrediente) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredientes[]";
        checkbox.value = ingrediente.precio;

        const label = document.createElement("label");
        label.setAttribute("for", ingrediente.id);
        label.textContent = `${ingrediente.nombre} - ${ingrediente.precio}€`;

        ingredientesDiv.appendChild(checkbox);
        ingredientesDiv.appendChild(label);
        ingredientesDiv.appendChild(document.createElement("br"));
    });

    ingredientesDiv.appendChild(document.createElement("br"));//He añadido este br
}

//REQUERIMIENTO 2
//Cuando haga click se calcula el precio y se muestra
window.addEventListener("click", function () {
    // Realizo una solicitud AJAX para obtener los datos del servidor de la forma que nos ha enseñado felix no lo consigo
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "actividad2.json", true); 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const data = JSON.parse(xmlhttp.responseText);
            calcularPrecio(data.tamanos, data.ingredientes);
            //cargarTamanos(data.tamanos);
            //cargarIngredientes(data.ingredientes);
        }
    };
    xmlhttp.send();
});

//Llamada a AJAX para pedir precios y sumar lo seleccionado
function calcularPrecio(){
    let resultado = 0;
    let radios = document.getElementsByName("tamano");
    for(radio of radios){
        if(tamano.checked){
            continue
        }       
    }

}

/*
window.onload = function () {
    cargarPagina();
}*/

/*
window.onload = function (){

    
    function calcularPrecio() {
        const nombre = formulario.elements.nombre.value;
        const direccion = formulario.elements.direccion.value;
        const telefono = formulario.elements.telefono.value;
        const email = formulario.elements.email.value;
        const tamano = formulario.elements.tamano.value;
        const ingredientes = formulario.elements['ingredientes[]'];
    
        let precioBase = 0;
    
        switch (tamano) {
            case "pequena":
                precioBase = 5;
                break;
            case "mediana":
                precioBase = 10;
                break;
            case "grande":
                precioBase = 15;
                break;
        }
    
        let precioIngredientes = 0;
    
        for (let i = 0; i < ingredientes.length; i++) {
            if (ingredientes[i].checked) {
                precioIngredientes += 1;
            }
        }

        if (nombre == "" || direccion == "" || telefono == "" || email == ""){
            alert("Faltan datos");
            return;
        }
        
        if (precioBase === 0) {
            alert("Debes seleccionar un tamaño de pizza.");
            return;
        }
    
        if (precioIngredientes === 0) {
            alert("Debes seleccionar al menos un ingrediente.");
            return;
        }

        const precioTotal = precioBase + precioIngredientes;
        document.getElementById("resultado").innerHTML = `Tamaño: ${tamano}<br>Ingredientes: ${precioIngredientes}€<br>Precio total: ${precioTotal}€`;
    }
        

    boton.onclick = calcularPrecio;
}
*/