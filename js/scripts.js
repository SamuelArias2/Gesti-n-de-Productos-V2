const apiUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Lista';
const saveUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Guardar';
const editUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Editar'; // Endpoint para editar productos
const deleteUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Eliminar'; // Endpoint para eliminar productos
const searchUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Obtener';  // Endpoint para buscar productos por ID

// Función para obtener y mostrar los productos y categorías
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const productos = data.response;

        // Obtener categorías únicas
        const categorias = {};
        productos.forEach(producto => {
            if (producto.oCategoria && !categorias[producto.oCategoria.idCategoria]) {
                categorias[producto.oCategoria.idCategoria] = producto.oCategoria.descripcion;
            }
        });

        // Llenar el <select> con categorías
        const categoriaSelect = document.getElementById('categoria');
        categoriaSelect.innerHTML = '<option value="" disabled selected>Selecciona una categoría</option>';
        for (const [idCategoria, descripcion] of Object.entries(categorias)) {
            const option = document.createElement('option');
            option.value = idCategoria;
            option.textContent = descripcion;
            categoriaSelect.appendChild(option);
        }

        // Llenar la tabla de productos
        const productTable = document.getElementById('product-list');
        productTable.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center">${producto.idProducto}</td>
                <td class="px-4 py-2 text-center">${producto.codigoBarra}</td>
                <td class="px-4 py-2 text-center">${producto.descripcion}</td>
                <td class="px-4 py-2 text-center">${producto.marca}</td>
                <td class="px-4 py-2 text-center">${producto.oCategoria.descripcion}</td>
                <td class="px-4 py-2 text-center">${producto.precio}</td>
                <td class="px-4 py-2 text-center">
                    <button class=" bg-red-500 w-[80px] h-[40px] text-white radius-[40px]" onclick="deleteProduct(${producto.idProducto})">Eliminar</button>
                </td>
            `;
            productTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para agregar un producto
async function addProduct(event) {
    event.preventDefault();

    const codigoBarra = document.getElementById('codigoBarra').value;
    const descripcion = document.getElementById('descripcion').value;
    const marca = document.getElementById('marca').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const newProduct = {
        codigoBarra: codigoBarra,
        descripcion: descripcion,
        marca: marca,
        idCategoria: parseInt(categoria),
        precio: parseFloat(precio)
    };

    try {
        const response = await fetch(saveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert('Producto agregado exitosamente');
            fetchProducts();
        } else {
            alert('Error al agregar producto');
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
}

// Función para editar un producto
async function editProduct(event) {
    event.preventDefault();

    const idProducto = document.getElementById('edit-id').value;
    const codigoBarra = document.getElementById('edit-codigoBarra').value;
    const descripcion = document.getElementById('edit-descripcion').value;
    const marca = document.getElementById('edit-marca').value;
    const categoria = document.getElementById('edit-categoria').value;
    const precio = document.getElementById('edit-precio').value;

    const updatedProduct = {
        idProducto: parseInt(idProducto),
        codigoBarra: codigoBarra,
        descripcion: descripcion,
        marca: marca,
        idCategoria: parseInt(categoria),
        precio: parseFloat(precio)
    };

    try {
        const response = await fetch(editUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            alert('Producto editado exitosamente');
            fetchProducts();
        } else {
            alert('Error al editar producto');
        }
    } catch (error) {
        console.error('Error al editar producto:', error);
    }
}

// Función para eliminar un producto
async function deleteProduct(idProducto) {
    try {
        const response = await fetch(`${deleteUrl}/${idProducto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado exitosamente');
            fetchProducts();
        } else {
            alert('Error al eliminar producto');
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}

// Función para buscar un producto por ID
async function searchProduct() {
    const idProducto = document.getElementById('search-id').value;

    try {
        const response = await fetch(`${searchUrl}/${idProducto}`);

        if (response.ok) {
            const data = await response.json();
            const producto = data.response;
            alert(`Producto encontrado:\nID: ${producto.idProducto}\nDescripción: ${producto.descripcion}\nMarca: ${producto.marca}\nPrecio: ${producto.precio}`);
        } else {
            alert('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al buscar producto:', error);
    }
}

// Manejar el envío de formularios y búsquedas
document.getElementById('product-form').addEventListener('submit', addProduct);
document.getElementById('edit-form').addEventListener('submit', editProduct);
document.getElementById('search-button').addEventListener('click', searchProduct);

// Cargar los productos y categorías al cargar la página
document.addEventListener('DOMContentLoaded', fetchProducts);
