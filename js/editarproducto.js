document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.getElementById('openEditPopup');
    const closePopupButton = document.getElementById('closeEditPopupButton');
    const editPopup = document.getElementById('editPopup');
    const editForm = document.getElementById('edit-product-form');

    // Mostrar el popup
    openPopupButton.addEventListener('click', () => {
        editPopup.classList.remove('hidden');
        // Aquí puedes cargar los datos del producto
        loadProductData();
    });

    // Cerrar el popup
    closePopupButton.addEventListener('click', () => {
        editPopup.classList.add('hidden');
    });

    // Enviar datos del formulario a la API
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const productData = {
            idProducto: document.getElementById('idProducto').value,
            codigoBarra: document.getElementById('codigoBarra').value,
            descripcion: document.getElementById('descripcion').value,
            marca: document.getElementById('marca').value,
            idCategoria: document.getElementById('idCategoria').value,
            precio: document.getElementById('precio').value,
        };

        try {
            const response = await fetch('http://www.codigoestudiante1.somee.com/api/Producto/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                // Notificar éxito
                Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Producto actualizado con éxito',
                    showConfirmButton: false,
                    timer: 3000
                });
                // Ocultar popup
                editPopup.classList.add('hidden');
                // Actualizar la tabla de productos si es necesario
                // updateProductTable();
            } else {
                throw new Error('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Error al actualizar el producto',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });

    // Función para cargar datos del producto (ejemplo)
    async function loadProductData() {
        // Aquí deberías obtener el ID del producto a editar
        // Ejemplo: const productId = ...;
        const productId = 1; // Cambia esto según tu lógica

        try {
            const response = await fetch(`http://www.codigoestudiante1.somee.com/api/Producto/Lista/${productId}`);
            const data = await response.json();

            // Completar el formulario con los datos del producto
            document.getElementById('idProducto').value = data.idProducto;
            document.getElementById('codigoBarra').value = data.codigoBarra;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('marca').value = data.marca;
            document.getElementById('idCategoria').value = data.idCategoria;
            document.getElementById('precio').value = data.precio;
        } catch (error) {
            console.error('Error al cargar los datos del producto:', error);
        }
    }
});
