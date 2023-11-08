console.log("hola")
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
    xmlhttp.open("GET", "pizza.json", true); 
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const data = JSON.parse(xmlhttp.responseText);
            cargarTamanos(data.tamanos);
            cargarIngredientes(data.ingredientes);
        }
    };
    xmlhttp.send();
});
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
        label.textContent = `${tamano.nombre} - ${tamano.precio}€`;

        tamanosDiv.appendChild(radio);
        tamanosDiv.appendChild(label);
        tamanosDiv.appendChild(document.createElement("br"));
    });
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
}