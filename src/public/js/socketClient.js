const socketClient = io();

// Asigno
// Asigno
const addform = document.querySelector("#addproduct");
addform.addEventListener("submit", (ev) => {
    ev.preventDefault();
    // Crear objeto con los valores del formulario
    const producto = {
        title: ev.currentTarget.title.value,
        description: ev.currentTarget.description.value,
        price: ev.currentTarget.price.value,
        status: ev.currentTarget.status.value,
        category: ev.currentTarget.category.value,
        thumbnails: [ev.currentTarget.thumbnails.value],
        code: ev.currentTarget.code.value,
        stock: ev.currentTarget.stock.value,
    };
    // evento para agragar el producto
    socketClient.emit("addProd", JSON.stringify(producto));
});

//  botones para borrar el producto
const deletebutton = document.querySelectorAll(".deleteproduct");
deletebutton.forEach((button) => {
    button.addEventListener("click", (ev) => {
        ev.preventDefault();
        socketClient.emit("deleteProd",ev.currentTarget.getAttribute("prodid"),);
    });
});
socketClient.on("products", (productos) => {
    let innerHtml = "";
    //  html para reemplazar los productos en realTimeProducts
    productos.forEach((producto) => {
        innerHtml += `
    <div id="product${producto.id}">
        <h4>${producto.title}</h4>
        <img "${producto.thumbnails[0]}" alt="foto producto" width="100"/>
        <p>${producto.description}</p>
        <p>Precio: $${producto.price}</p>
        <p>Categoría: ${producto.category}</p>
        <p>Imagen: ${producto.thumbnails[0]}</p>
        <p>Status: ${producto.status}</p>
        <p>Código: ${producto.code}</p>
        <p>Stock: ${producto.stock}</p>
        <input type="button" class="deleteproduct" prodid="${producto.id}" value="Borrar este producto"/>
    </div>
    `;
    });
    document.querySelector("#realtimeproducts").innerHTML = innerHtml;
    // botones para borrar el producto
    const deletebutton = document.querySelectorAll(".deleteproduct");
    deletebutton.forEach((button) => {
        button.addEventListener("click", (ev) => {
            ev.preventDefault();
            socketClient.emit(
                "deleteProd",
                ev.currentTarget.getAttribute("prodid"),
            );
        });
    });
});
socketClient.on("error", (errores) => {
    let errorestxt = "ERROR\r";
    errores.errortxt.forEach((error) => {
        errorestxt += error + "\r";
    });
    alert(errorestxt);
});
socketClient.on("result", (reaultado) => {
    alert(reaultado);
});
