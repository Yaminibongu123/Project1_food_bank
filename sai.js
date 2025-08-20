document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission

  const fullName = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const message = document.getElementById('message');

  // Simple validation
  if (fullName === '' || email === '' || username === '' || password === '') {
    message.textContent = 'Please fill in all fields.';
    return;
  }

  if (!validateEmail(email)) {
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate success (in real usage, you’d send data to a backend)
  message.style.color = 'green';
  message.textContent = 'Registration successful!';
  window.location.href="log.html"
  this.reset();
});

// Simple email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}