// Elementos del DOM
const addProductButton = document.getElementById('addProductButton');
const addPopup = document.getElementById('addPopup');
const closePopupButton = document.getElementById('closePopupButton');
const productForm = document.getElementById('product-form');

// Función para abrir el popup
addProductButton.addEventListener('click', () => {
    addPopup.classList.remove('hidden');
});

// Función para cerrar el popup
closePopupButton.addEventListener('click', () => {
    addPopup.classList.add('hidden');
});

// Enviar el formulario a la API
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(productForm);
    const productData = Object.fromEntries(formData.entries());

    // Llamada a la API para guardar el producto
    try {
        const response = await fetch('http://www.codigoestudiante1.somee.com/api/Producto/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            // Mostrar notificación de éxito
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: 'Guardado correctamente'
            });

            // Limpiar el formulario y cerrar el popup
            productForm.reset();
            addPopup.classList.add('hidden');

            // Actualizar la página después de que la notificación se haya mostrado
            setTimeout(() => {
                window.location.reload();
            }, 3000); // Espera 3 segundos antes de actualizar la página para dar tiempo a la notificación
        } else {
            alert('Error al agregar el producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la solicitud');
    }
});
