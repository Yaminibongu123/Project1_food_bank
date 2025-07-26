document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  
  const patterns = {
    fullName: /^[A-Za-z\s]{2,50}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };
  
  const errorTexts = {
    fullName: 'Name must be 2–50 letters/spaces.',
    email: 'Please enter a valid email.',
    password: 'Password must be at least 8 chars, include uppercase & number.',
    confirmPassword: 'Passwords do not match.',
    terms: 'You must accept the terms.'
  };

  function validateField(field) {
    const val = field.value.trim();
    const name = field.name;
    const err = document.getElementById(`${name}-error`);

    err.textContent = '';
    field.classList.remove('input-error');

    if (!val) {
      field.classList.add('input-error');
      err.textContent = 'This field is required.';
      return false;
    }
    if (patterns[name] && !patterns[name].test(val)) {
      field.classList.add('input-error');
      err.textContent = errorTexts[name];
      return false;
    }
    return true;
  }

  function validateConfirm() {
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    const err = document.getElementById('confirmPassword-error');
    err.textContent = '';
    confirm.classList.remove('input-error');
    if (confirm.value !== pass.value) {
      confirm.classList.add('input-error');
      err.textContent = errorTexts.confirmPassword;
      return false;
    }
    return true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    ['fullName','email','password'].forEach(name => {
      const field = document.querySelector(`[name="${name}"]`);
      if (!validateField(field)) valid = false;
    });

    if (!validateConfirm()) valid = false;

    const terms = document.getElementById('terms');
    if (!terms.checked) {
      document.getElementById('terms-error').textContent = errorTexts.terms;
      valid = false;
    } else {
      document.getElementById('terms-error').textContent = '';
    }

    if (valid) {
      alert('Registration successful! 🎉');
      // form.submit(); // Uncomment to actually send to server
    }
  });
});
