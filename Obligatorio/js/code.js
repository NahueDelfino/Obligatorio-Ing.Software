  const form = document.getElementById('bookingForm');
  const message = document.getElementById('message');

  const dateInput = document.getElementById('date');
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const max = new Date();
  max.setDate(max.getDate() + 15);

  dateInput.min = today.toISOString().split('T')[0];
  dateInput.max = max.toISOString().split('T')[0];

  form.addEventListener('submit', e => {
    e.preventDefault();
    message.textContent = 'Reserva realizada con éxito!';
    message.className = 'success';
    form.reset();
  });

  // Admin login simulation
  const loginLink = document.querySelector('a[href="#login"]');
  const modal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  loginLink.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  function closeLogin() {
    modal.style.display = 'none';
    loginForm.reset();
    loginError.textContent = '';
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === 'Admin' && pass === 'veterinaria') {
      closeLogin();
      alert('Inicio de sesión correcto');
    } else {
      loginError.textContent = 'Usuario o contraseña incorrectos';
    }
  });
    message.className = 'success';
    form.reset();