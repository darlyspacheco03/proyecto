let carrito = [];
let total = 0;

function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarCarrito();
  mostrarSeccion('carrito');
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} - $${item.precio}`;
    lista.appendChild(li);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

function validarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  if (nombre.length < 3) {
    alert('El nombre debe tener al menos 3 caracteres.');
    return false;
  }

  if (!email.includes('@')) {
    alert('Correo electrónico inválido.');
    return false;
  }

  alert('¡Compra realizada con éxito!');
  return true;
}