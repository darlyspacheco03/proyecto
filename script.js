let carrito = [];
let total = 0;

// Muestra solo la sección indicada
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => sec.classList.remove('activa'));
  const destino = document.getElementById(id);
  if (destino) {
    destino.classList.add('activa');
  }
}

// Agrega productos al carrito y muestra la sección carrito
function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio: Number(precio), cantidad: 1 });
  actualizarCarrito();
  mostrarSeccion('carrito');
}

// Actualiza la UI del carrito (lista y total)
function actualizarCarrito() {
  const contenedorDiv = document.getElementById('carrito-items');
  const listaUl = document.getElementById('lista-carrito');
  if (contenedorDiv) contenedorDiv.innerHTML = '';
  if (listaUl) listaUl.innerHTML = '';

  carrito.forEach((item, index) => {
    const texto = `${item.producto} - $${item.precio} x ${item.cantidad || 1}`;

    if (contenedorDiv) {
      const div = document.createElement('div');
      div.textContent = texto;
      contenedorDiv.appendChild(div);
    }

    if (listaUl) {
      const li = document.createElement('li');
      li.textContent = texto;
      listaUl.appendChild(li);
    }
  });

  total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  const totalElem = document.getElementById('total');
  if (totalElem) {
    totalElem.textContent = total.toFixed(2);
  }
}

// Vacía completamente el carrito
function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}

// Cambia la cantidad de un producto según su índice
function cambiarCantidad(index, nuevaCantidad) {
  const cantidad = parseInt(nuevaCantidad, 10);
  if (!isNaN(cantidad) && carrito[index]) {
    carrito[index].cantidad = cantidad;
    actualizarCarrito();
  }
}

// Valida datos básicos del formulario de compra
function validarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  if (nombre.length < 3) {
    alert('El nombre debe tener al menos 3 caracteres.');
    return false;
  }

  if (!email.includes('@') || !email.includes('.')) {
    alert('Por favor ingresa un correo electrónico válido.');
    return false;
  }

  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return false;
  }

  alert('Compra realizada con éxito. ¡Gracias por tu compra!');
  // Aquí podrías enviar el formulario realmente si tienes backend
  // Por ahora solo detenemos el envío real
  return false;
}

// Cuando carga el DOM, configuramos menú y navegación
document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const btn = document.getElementById('btnMenu');
  const menu = document.getElementById('menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('activo');
    });
  }

  // Navegación entre secciones usando el menú
  document.querySelectorAll('#menu a').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      const idDestino = enlace.getAttribute('href').substring(1);
      mostrarSeccion(idDestino);

      // Cerrar el menú en móvil después de hacer clic
      if (window.innerWidth <= 768 && menu && menu.classList.contains('activo')) {
        menu.classList.remove('activo');
      }
    });
  });
});
