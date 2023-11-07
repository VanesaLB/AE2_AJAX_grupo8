// Elaboro la función calcular precio que después será llamada en el formulario a traves del 
//evento onclick del button "Procesar pedido".
//Esta función accede a el formulario a través de su id "pedido-form" y crea la referencia formulario.
/* Después extrae los valores del formulario como nombre, direccion ...a través de las 
   propiedades "elements" del formulario y sus nombres . 
*/
function calcularPrecio() {
    const formulario = document.getElementById("pedido-form");
    const nombre = formulario.elements.nombre.value;
    const direccion = formulario.elements.direccion.value;
    const telefono = formulario.elements.telefono.value;
    const email = formulario.elements.email.value;
    // Ponemos un if para que no se quede vacio ningun dato
    if (nombre == ""  ,direccion == "" , telefono == "" || email == ""){
        alert("Faltan datos");
        return;
    }
    const tamano = formulario.elements.tamano.value;
    const ingredientes = formulario.elements['ingredientes[]'];
 // inicializamos la variable "let precioBase " a 0 .
    let precioBase = 0;
 // Utilizamos un switch para determinar el costo base en función de el tamaño de la pizza seleccioado.
 //Y el precio se asigna a la variable "precioBase".
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
    //inicializamos la variable "precioIngredientes " a 0.

    let precioIngredientes = 0;
    //Utilizamos un bucle for para recorrer la lista de ingredientes y sumar 1 al "pecioIngredientes"
    //por cada ingrediente que se seleccione , si es checked , esta seleccionado y se suma 1 a 
    // "precioIngredientes".
    for (let i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i].checked) {
            precioIngredientes += 1;
        }
    }
     // Si el precioBse esta vacío sale una alerta y se para la función .
    if (precioBase === 0) {
        alert("Debes seleccionar un tamaño de pizza.");
        return;
    }
    //Si no hay ningún ingrediente seleccionado , sale la alerta que avisa que se tiene que seleccionar 
    //al menos uno y se para la función .

    if (precioIngredientes === 0) {
        alert("Debes seleccionar al menos un ingrediente.");
        return;
    }
    //Si ya se cumplen las dos condiciones anteriores , se calcula el "precioTotal" que es la suma de "precioBase" +
    //"precioIngredientes" .

    const precioTotal = precioBase + precioIngredientes;
    // Accedemos al id "resultado " del div y mediante un innerHTML mostramos el tamaño, el precio de los ingredientes 
    //y el precio total en el html.
    document.getElementById("resultado").innerHTML = `Tamaño: ${tamano}<br>Ingredientes: ${precioIngredientes}€<br>Precio total: ${precioTotal}€`;
}