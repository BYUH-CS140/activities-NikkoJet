document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent normal submit for validation
  
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value.trim();
  
    // Validation regex patterns
    const usernameValid = /^[a-zA-Z0-9]{5,}$/.test(username);
    const emailValid = /^[^@]+@\w+(\.\w+)+\w$/.test(email);
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    const phoneValid = /^\+?\d{1,3}?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/.test(phone);
  
    // Helper to show/hide feedback
    function toggleFeedback(id, isValid, message) {
      const el = document.getElementById(id);
      if (isValid) {
        el.style.display = 'none';
        el.textContent = '';
      } else {
        el.style.display = 'block';
        el.textContent = message;
      }
    }
  
    toggleFeedback('usernameFeedback', usernameValid, 'Username should be at least 5 characters long and contain only letters and numbers.');
    toggleFeedback('emailFeedback', emailValid, 'Please enter a valid email address.');
    toggleFeedback('passwordFeedback', passwordValid, 'Password should be at least 8 characters long, contain numbers and both lowercase and uppercase letters.');
    toggleFeedback('phoneFeedback', phoneValid, 'Please enter a valid phone number (e.g., +1 234-567-8901).');
  
    const formValid = usernameValid && emailValid && passwordValid && phoneValid;
  
    const registrationFeedback = document.getElementById('registrationFeedback');
  
    if (formValid) {
      registrationFeedback.textContent = 'Your user registration was accepted!';
      registrationFeedback.style.display = 'block';
      // Optionally submit the form here if real submission is desired:
      // this.submit();
    } else {
      registrationFeedback.textContent = '';
      registrationFeedback.style.display = 'none';
    }
  });
  