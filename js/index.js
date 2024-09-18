const apiUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Lista';
const deleteUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Eliminar'; // Asegúrate de que el endpoint exista

// Función para obtener y mostrar los productos
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const productos = data.response;

        // Llenar la tabla de productos
        const productTable = document.getElementById('product-list');
        productTable.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-left">${producto.idProducto}</td>
                <td class="px-4 py-2 text-left">${producto.codigoBarra}</td>
                <td class="px-4 py-2 text-left">${producto.descripcion}</td>
                <td class="px-4 py-2 text-left">${producto.marca}</td>
                <td class="px-4 py-2 text-left">${producto.oCategoria.descripcion}</td>
                <td class="px-4 py-2 text-left">${producto.precio}</td>
                <td class="px-4 py-2 text-center">
                    <button class="rounded-3xl bg-red-500 hover:bg-red-700 w-[80px] h-[40px] text-white radius-[40px]" 
                        onclick="deleteProduct(${producto.idProducto})">
                        Eliminar
                    </button>
                </td>
            `;
            productTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para eliminar un producto con SweetAlert
async function deleteProduct(idProducto) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación
            eliminarProducto(idProducto);
        }
    });
}

// Función que realiza la solicitud DELETE
async function eliminarProducto(idProducto) {
    try {
        const response = await fetch(`${deleteUrl}/${idProducto}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Mostrar notificación de éxito
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                icon: 'success',
                title: 'Eliminado correctamente'
            });

        
            fetchProducts(); // Refresca la tabla después de eliminar el producto
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar el producto.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false,
                position: 'top',
                customClass: {
                    popup: 'swal-custom-position',
                }
            });
        }
        
        
    } catch (error) {
        console.error('Error en la solicitud de eliminación:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar eliminar el producto.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
            position: 'top-right'
        });
    }
}

// Llamada inicial para cargar los productos cuando la página se cargue
fetchProducts();
