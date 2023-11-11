
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
// Función para cargar tamaños  dinámicamente
function cargarTamanos(tamano) {
    // Obtengo la referencia al elemento HTML con el ID "tamanos-pizza". Aqui se cargaran los tamaños .
    const tamanosDiv = document.getElementById("tamanos-pizza");
    //Recorre cada tamaño del array.
    tamano.forEach((tamano) => {
     //Dentro del bucle creo un elemento input de tipo radio para cada tamaño.
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "tamano";//Asigno este nombre al radio.
        radio.value = tamano.precio;// Establezco el valor del radio con el precio de cada tamaño.
        radio.required = true;
     // creo un label para asociarlo con el radio y proporcionar una descripcion con el id de cada tamaño en json.
        const label = document.createElement("label");
        label.setAttribute("for", tamano.id);
     // y le digo que contenga el texto del nombre y precio del tamaño
        label.textContent = `${tamano.nombre} - ${tamano.precio}€`;
     // Agrego  el radio y la etiqueta  label al contenedor lo separo con br .
        tamanosDiv.appendChild(radio);
        tamanosDiv.appendChild(label);
        tamanosDiv.appendChild(document.createElement("br"));
    });
}
// Función para cargar ingredientes dinámicamente
function cargarIngredientes(ingredientes) {
   // Obtiene la referencia al elemento HTML con el ID "ingredientes-pizza". Este es
   //  un contenedor donde se cargarán los ingredientes de la pizza.
    const ingredientesDiv = document.getElementById("ingredientes-pizza");
    // Recorre cada elemento del array ingredientes.
    ingredientes.forEach((ingrediente) => {
     //Dentro del bucle, se crea un elemento input de tipo checkbox para cada ingrediente.
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredientes[]";//Asigno un nombre al checkbox 
        checkbox.value = ingrediente.precio;// Establezco el valor del checkbox como el precio del ingrediente.
     //A continuación, creo un elemento label para asociarlo con el checkbox y proporcionar una descripción con el id 
     //del ingrediente del json
        const label = document.createElement("label");
        label.setAttribute("for", ingrediente.id);
        label.textContent = `${ingrediente.nombre} - ${ingrediente.precio}€`;// Establezco el texto de la etiqueta con el nombre y precio del ingrediente.

        ingredientesDiv.appendChild(checkbox);//Agrego el checkbox al contenedor .
        ingredientesDiv.appendChild(label);//Agrego la etiqueta al contenedor.
        ingredientesDiv.appendChild(document.createElement("br"));// Lo separo mediante etiqueta br.
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






