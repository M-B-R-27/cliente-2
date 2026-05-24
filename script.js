// =====================
//  ID ÚNICO DEL CLIENTE
// =====================
const clienteId = 'cliente2';
 
// =====================
//  REFERENCIAS AL DOM
// =====================
const inputMensaje = document.getElementById('input-mensaje');
const btnEnviar    = document.getElementById('btn-enviar');
const chatBody     = document.querySelector('.chat-body');
 
// =====================
//  ENVIAR MENSAJE
// =====================
btnEnviar.addEventListener('click', enviarMensaje);
inputMensaje.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enviarMensaje();
});
 
async function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    if (!texto) return;
 
    agregarMensaje(texto, 'enviado');
    inputMensaje.value = '';
    inputMensaje.focus();
 
    try {
        const res = await fetch('http://localhost:3000/mensaje', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje: texto, clienteId })
        });
        const data = await res.json();
        console.log('Servidor respondió:', data);
    } catch (e) {
        console.error('Error de conexión con el servidor:', e);
    }
}
 
// =====================
//  CREAR BURBUJA
// =====================
function agregarMensaje(texto, tipo) {
    const div = document.createElement('div');
    div.classList.add('mensaje', tipo);
 
    const p = document.createElement('p');
    p.textContent = texto;
 
    const hora = document.createElement('span');
    hora.classList.add('hora');
    hora.textContent = obtenerHora();
 
    div.appendChild(p);
    div.appendChild(hora);
    chatBody.appendChild(div);
    scrollAbajo();
}
 
// =====================
//  HORA ACTUAL
// =====================
function obtenerHora() {
    const ahora = new Date();
    const h = ahora.getHours().toString().padStart(2, '0');
    const m = ahora.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
}
 
// =====================
//  SCROLL AL FONDO
// =====================
function scrollAbajo() {
    chatBody.scrollTop = chatBody.scrollHeight;
}
 
// =====================
//  HEADER — ACTUALIZAR
// =====================
function actualizarUsuario(nombre) {
    document.getElementById('nombre-usuario').textContent = nombre;
}
 
function actualizarEstado(estado) {
    document.getElementById('estado-usuario').textContent = estado;
}
 
function actualizarFoto(urlFoto) {
    const avatar = document.querySelector('.header-avatar');
    const img = document.createElement('img');
    img.src = urlFoto;
    img.alt = 'Foto de perfil';
    avatar.innerHTML = '';
    avatar.appendChild(img);
}
 
// =====================
//  SSE — RECIBIR MENSAJES
// =====================
const eventSource = new EventSource(`http://localhost:3000/escuchar?clienteId=${clienteId}`);
 
eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    agregarMensaje(data.mensaje, 'recibido');
};
 
eventSource.onerror = () => {
    console.error('Error en la conexión SSE');
};
 