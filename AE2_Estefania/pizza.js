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
// Función para calcular el precio del pedido
function calcularPrecio() {
    const formulario = document.getElementById("pedido-form");
    const tamanoSeleccionado = formulario.elements.tamano;
    let tamanoElegido = null;
    // creamos la constante tamañoSeleccionado y en el formulario el elemento tamaño.
    //recorremos los tamaños y los seleccionados los guardamos en la constante tamañoElegido
    for (let i = 0; i < tamanoSeleccionado.length; i++) {
        if (tamanoSeleccionado[i].checked) {
            tamanoElegido = tamanoSeleccionado[i];
            console.log(i);
            break;
        }
    }
    
    if (!tamanoElegido) {
        alert("Debes seleccionar un tamaño de pizza.");
        return;
    }
    // Obtiene el precio base como un número con parseFloat
    const precioBase = parseFloat(tamanoElegido.value);

    const ingredientesSeleccionados = formulario.elements["ingredientes[]"];
    const ingredientes = [];
    // busca  a través de las selecciones de ingredientes es decir los recorre y coge los que estan seleccionados 
    //y los mete en la constante creada ingredientes 
    for (let i = 0; i < ingredientesSeleccionados.length; i++) {
        if (ingredientesSeleccionados[i].checked) {
            ingredientes.push(ingredientesSeleccionados[i]);
            console.log(i);
    }
        }
        
     //decimos que si no se ha seleccionado ningun ingrediente rompa la funcion y vuelva atras 
    if (ingredientes.length === 0) {
        alert("Debes seleccionar al menos un ingrediente.");
        return;
    }

    //Buscamos a traves de ingredientes , sabiendo que ya estos son los seleccionados por que los hemos 
    //metido antes en la constante ingredientes . Como son los seleccionados obtenemos de ellos el precio y los vamos 
    //sumando y este valor se le da a precio ingredientes 
    let precioIngredientes = 0;
    for (let i = 0; i < ingredientes.length; i++) {
        precioIngredientes += parseFloat(ingredientes[i].value);
        console.log("tres");
    }
    
     // creamos la constante precioTotal a partir de la suma de precioBase y precioIngredientes .
     //despues en el dom buscamos el div "resultado " por su id y le introducimos el resultado .
    const precioTotal = precioBase + precioIngredientes;
    document.getElementById("resultado").innerHTML = `Precio total: ${precioTotal}€`;
}






