document.getElementById('btn').addEventListener('click', async () => {
    const n1 = document.getElementById('n1').value; // vakue capturar valor 
    const n2 = document.getElementById('n2').value;

    try {
        // Apuntamos a la URL donde corre el servidor independiente
        const res = await fetch('http://localhost:3000/sumar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1: n1, num2: n2 })
        });
        const data = await res.json();
        document.getElementById('res').innerText = data.resultado;
    } catch (e) {
        document.getElementById('res').innerText = "Error de conexión";
    }




});