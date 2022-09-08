let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
document.getElementById("carritoTotal").innerHTML = carrito.length+ "- $" + total;

const titulo = document.getElementById("tituloPrincipal").innerHTML = "MTG Store";
const subtitulo = document.getElementById("subtituloPrincipal").innerHTML = "La mejor tienda del país";

const productos = [{
    id: 1,
    titulo: "Booster Box Neon Destiny Kamigawa",
    precio: 1500,
    descrip: "Caja Sellada Edición Dominaria, contiene 36 boosters. Edición Limitada",
    imagen: "assets/img/boosterBoxKamigawa.png",
},
{
    id: 2,
    titulo: "Booster Box New Capenna",
    precio: 2000,
    descrip: "Caja Sellada Edición New Capenna, contiene 36 boosters. Edición Limitada",
    imagen: "assets/img/boosterBoxNewCapenna.png",
},
{
    id: 3,
    titulo: "Booster Box Dominaria",
    precio: 2500,
    descrip: "Caja Sellada Edición Dominaria, contiene 36 boosters. Edición Limitada",
    imagen: "assets/img/boosterBoxDominaria.png"
},
]

productos.forEach((producto) => {
    const botonAgregar = `agregar ${producto.id}`;
    document.getElementById("seccion-cards").innerHTML += `<div class="card d-flex justify-content-center bg-secondary" style="width: 18rem; height:25rem;">
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">"${producto.titulo}"</h5>
    <h2 class="price text-orange">$${producto.precio}</h2>
    <p class="card-text">${producto.descrip}.</p>
    <a href="#" class="btn btn-secondary bg-orange" id="${producto.id}" data-id="${producto.id}">Agregar al Carrito</a>
    </div>
</div>`
})

renderizarCarrito();

productos.forEach(producto => {
    document.getElementById(producto.id).addEventListener('click', () => {
        const product = document.getElementById(`producto-${producto.id}`)
        let nuevoProducto = producto
        
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
        
        document.getElementById("carritoTotal").innerHTML = carrito.length+ "- $" + total;
        document.getElementById("listadoDeCompras").innerHTML = "";
        
        if(product) {
            const existe = carrito.filter( item => item.id === nuevoProducto.id ) 
            nuevoProducto.cantidad = existe[0].cantidad + 1
            const filtrado = carrito.filter( item => item.id !== nuevoProducto.id )
            const carritoActualizado = [...filtrado, nuevoProducto]
            localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
        } else {
            nuevoProducto.cantidad = nuevoProducto.cantidad = 1;
            carrito.push(nuevoProducto)
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    
        renderizarCarrito()
    })
})

//

function renderizarCarrito() {
    const listadoCompras = document.getElementById('listadoDeCompras')
    listadoCompras.innerHTML = ''
    carrito.forEach((producto) => {
        listadoCompras.innerHTML += `
        <div class="cart-table-item-row" id='producto-${producto.id}'>
            <div class="cart-table-body-item">${producto.id}</div>
            <div class="cart-table-body-item">${producto.titulo}</div>
            <div class="cart-table-body-item">$${producto.precio}</div>
            <div class="cart-table-body-item">${producto.cantidad}</div>
            <div class="cart-table-body-item"><img src="${producto.imagen}" style="width:100px" </img></div>
            <div class="cart-table-body-item"><div class="del-btn btn btn-secondary" id="btn-borrar-${producto.id}" onClick="borrarProducto(${producto.id})">Eliminar</div></div>
        </div>`
    })
}

function borrarProducto(id) {
    const carritoActualizado = carrito.filter( item => item.id !== id)
    carrito = carritoActualizado
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    renderizarCarrito()
}


botonComprar = document.querySelector('#boton-comprar').addEventListener('click', () => {

    if(carrito.length >=1) {
        vaciarCarrito();
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Tu compra ha sido exitosa',
        showConfirmButton: false,
        timer: 1500
        
    })
    }
});

function vaciarCarrito (){
    document.getElementById("carritoTotal").innerHTML = 0+ "- $" + 0;
    document.getElementById("listadoDeCompras").innerHTML = "";
    carrito = []

}