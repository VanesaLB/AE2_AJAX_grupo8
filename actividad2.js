console.log("hola")

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
    

