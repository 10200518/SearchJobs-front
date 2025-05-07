import { manejarFormulario } from './MensajeErrorFrom.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nextButton = document.querySelector('button[type="button"]');
  const cancelButton = document.querySelector('button[type="button"]:first-child');
  const loginLink = document.querySelector('a[href*="sesion"]');

  const password = document.getElementById('passwordEmpresa');
  const confirmPassword = document.getElementById('confirmPasswordEmpresa');

  const reqLength = document.getElementById('req-length');
  const reqUppercase = document.getElementById('req-uppercase');
  const reqLowercase = document.getElementById('req-lowercase');
  const reqNumber = document.getElementById('req-number');
  const reqMatch = document.getElementById('req-match');

  const progressFill = document.querySelector('.progress-bar-fill');

  const validateForm = () => {
    const companyName = document.querySelector('input[placeholder="Nombre legal de la empresa"]').value;
    const taxId = document.querySelector('input[placeholder="Número de identificación tributaria"]').value;
    const companyType = document.querySelector('select').value;
    const email = document.querySelector('input[type="email"]').value;
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (!companyName || !taxId || companyType === "Selecciona una opción" || !email || !passwordValue || !confirmPasswordValue) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    const lengthValid = passwordValue.length >= 8 && passwordValue.length <= 15;
    const uppercaseValid = /[A-Z]/.test(passwordValue);
    const lowercaseValid = /[a-z]/.test(passwordValue);
    const numberValid = /[0-9]/.test(passwordValue);
    const matchValid = passwordValue !== '' && passwordValue === confirmPasswordValue;

    if (!lengthValid || !uppercaseValid || !lowercaseValid || !numberValid) {
      alert('La contraseña no cumple con los requisitos de seguridad.');
      return false;
    }

    if (!matchValid) {
      alert('Las contraseñas no coinciden.');
      return false;
    }

    return true;
  };

  const updatePasswordRequirements = () => {
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    reqLength.classList.toggle('valid', passwordValue.length >= 8 && passwordValue.length <= 15);
    reqUppercase.classList.toggle('valid', /[A-Z]/.test(passwordValue));
    reqLowercase.classList.toggle('valid', /[a-z]/.test(passwordValue));
    reqNumber.classList.toggle('valid', /[0-9]/.test(passwordValue));
    reqMatch.classList.toggle('valid', passwordValue !== '' && passwordValue === confirmPasswordValue);
  };

  if (nextButton) {
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateForm()) {
        progressFill.style.width = '100%';
        alert('Formulario válido. Avanzando al siguiente paso...');
      }
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres cancelar el registro?')) {
        window.location.href = '/';
      }
    });
  }

  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/iniciar-sesion';
    });
  }

  if (password && confirmPassword) {
    password.addEventListener('input', updatePasswordRequirements);
    confirmPassword.addEventListener('input', updatePasswordRequirements);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    manejarFormulario({
      form,
      validateForm,
      buildData: (formData) => ({
        nombre: formData.get('nombre'),
        sectorEmpresarial: formData.get('sectorEmpresa'),
        correo: formData.get('correo'),
        contrasena: formData.get('passwordEmpresa'),
        telefono: formData.get('telefono'),
        nit: formData.get('nit'),
      }),
      endpointUrl: 'http://localhost:8080/api/empresas/add',
      redirectUrl: '/login'
    });
  });
});
