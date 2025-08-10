/*<!-- ================================
FILE: script.js
DESCRIPTION: shared JS (fake auth, profile slide, form handlers)
================================ -->*/
/* Paste into script.js */
document.addEventListener('DOMContentLoaded', () => {
  // Profile toggle (button with id="open-profile" expected)
  document.querySelectorAll('#open-profile').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const p = document.querySelector('.profile-panel');
      if(p) p.classList.add('open');
    });
  });
  document.querySelectorAll('.profile-close').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.preventDefault(); btn.closest('.profile-panel').classList.remove('open'); });
  });

  // Populate profile display fields if available
  const name = sessionStorage.getItem('fb_name') || '';
  const email = sessionStorage.getItem('fb_email') || '';
  document.querySelectorAll('#profile-display-name').forEach(el=> el.textContent = name || 'Your Name');
  document.querySelectorAll('#profile-display-email').forEach(el=> el.textContent = email || 'you@example.com');

  // Profile update form
  const profileForm = document.getElementById('profile-update');
  if(profileForm){
    profileForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nm = document.getElementById('profile-name').value;
      const em = document.getElementById('profile-email').value;
      sessionStorage.setItem('fb_name', nm);
      sessionStorage.setItem('fb_email', em);
      // update UI displays
      document.querySelectorAll('#profile-display-name').forEach(el=> el.textContent = nm || 'Your Name');
      document.querySelectorAll('#profile-display-email').forEach(el=> el.textContent = em || 'you@example.com');
      alert('Profile updated (demo).');
      document.querySelector('.profile-panel').classList.remove('open');
    });
  }

  // Fake auth handlers
  const loginForm = document.getElementById('login-form');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      sessionStorage.setItem('fb_logged', '1');
      sessionStorage.setItem('fb_name', (email.split('@')[0] || 'User'));
      sessionStorage.setItem('fb_email', email);
      window.location.href = 'home.html';
    });
  }
  const signupForm = document.getElementById('signup-form');
  if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nm = document.getElementById('signup-name').value;
      const em = document.getElementById('signup-email').value;
      const role = document.getElementById('signup-role').value;
      sessionStorage.setItem('fb_logged','1');
      sessionStorage.setItem('fb_name', nm);
      sessionStorage.setItem('fb_email', em);
      sessionStorage.setItem('fb_role', role);
      window.location.href = 'home.html';
    });
  }

  // simple guard: redirect to login if visiting protected pages
  const protected = ['home.html','donate.html','receive.html','blog.html'];
  const path = window.location.pathname.split('/').pop();
  if(protected.includes(path) && sessionStorage.getItem('fb_logged') !== '1'){
    // if currently on index, don't redirect
    if(path !== 'index.html') window.location.href = 'login.html';
  }

  // personalize home greeting
  const greet = document.getElementById('user-greet');
  const nm = sessionStorage.getItem('fb_name');
  if(greet && nm) greet.textContent = nm;
});
