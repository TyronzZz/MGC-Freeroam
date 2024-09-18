// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAE5DyetTr9h6-D9f8ZoZO_4c1WAtx_LFQ",
    authDomain: "dripz-mgc-project.firebaseapp.com",
    projectId: "dripz-mgc-project",
    storageBucket: "dripz-mgc-project.appspot.com",
    messagingSenderId: "761431255020",
    appId: "1:761431255020:web:bfcdc00b4a373078e8c2c9",
    measurementId: "G-NX8YTQQ7TZ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  function showAuthBox(mode) {
      const authBox = document.getElementById('auth-box');
      const authForm = document.getElementById('auth-form');
      const authMessage = document.getElementById('auth-message');
      
      authForm.innerHTML = `
          <h2>${mode === 'login' ? 'Login' : 'Register'}</h2>
          <div class="input-container">
              <input type="text" id="name" placeholder="${mode === 'login' ? 'Name or Email' : 'Name'}" />
              <div id="name-error" class="error-text"></div>
          </div>
          ${mode === 'register' ? `
          <div class="input-container">
              <input type="email" id="email" placeholder="Email" />
              <div id="email-error" class="error-text"></div>
          </div>
          ` : ''}
          <div class="input-container">
              <input type="password" id="password" placeholder="Password" />
              <div id="password-error" class="error-text"></div>
          </div>
          <button onclick="handleSubmit('${mode}')">${mode === 'login' ? 'Login' : 'Register'}</button>
          <div id="message-container" class="transition-text"></div>
      `;
      
      authMessage.innerHTML = ''; // Clear previous message
      authBox.classList.add('show');
      document.getElementById('overlay').style.display = 'block';
  }
  
  function hideAuthBox() {
      const authBox = document.getElementById('auth-box');
      authBox.classList.remove('show');
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('auth-message').innerHTML = ''; // Clear message when closing
  }
  
  function handleSubmit(mode) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      
      const name = nameInput.value.trim();
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput.value.trim();
      
      let valid = true;
      
      // Reset errors
      document.getElementById('name-error').innerHTML = '';
      if (emailInput) document.getElementById('email-error').innerHTML = '';
      document.getElementById('password-error').innerHTML = '';
      
      // Validate inputs
      if (name.length < 3 || name.length > 24) {
          document.getElementById('name-error').innerHTML = 'Name must be between 3 and 24 characters.';
          valid = false;
      }
      if (emailInput && !email) {
          document.getElementById('email-error').innerHTML = 'Email is required.';
          valid = false;
      }
      if (password.length < 6) {
          document.getElementById('password-error').innerHTML = 'Password must be at least 6 characters long.';
          valid = false;
      }
      
      if (!valid) return;
      
      const messageContainer = document.getElementById('message-container');
      if (mode === 'login') {
          auth.signInWithEmailAndPassword(email || name, password)
              .then((userCredential) => {
                  messageContainer.innerHTML = 'Logged in successfully.';
                  setTimeout(() => {
                      hideAuthBox();
                      messageContainer.innerHTML = ''; // Clear message on close
                  }, 3000);
              })
              .catch((error) => {
                  const errorCode = error.code;
                  if (errorCode === 'auth/user-disabled') {
                      document.getElementById('name-error').innerHTML = 'Account is disabled.';
                  } else {
                      document.getElementById('name-error').innerHTML = 'Login failed: ' + error.message;
                  }
              });
      } else {
          auth.createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                  messageContainer.innerHTML = 'Registered successfully.';
                  setTimeout(() => {
                      hideAuthBox();
                      messageContainer.innerHTML = ''; // Clear message on close
                  }, 3000);
              })
              .catch((error) => {
                  messageContainer.innerHTML = 'Registration failed: ' + error.message;
              });
      }
  }
  