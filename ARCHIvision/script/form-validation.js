document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errorBox = document.getElementById("formErrors");
  
    form.addEventListener("submit", function (e) {
      let errors = [];
  
      if (name.value.trim() === "") {
        errors.push("Name is required.");
      }
  
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email.value.trim())) {
        errors.push("Please enter a valid email address.");
      }
  
      if (message.value.trim().length < 10) {
        errors.push("Message must be at least 10 characters long.");
      }
  
      errorBox.innerHTML = "";
      if (errors.length > 0) {
        e.preventDefault();
        errors.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          errorBox.appendChild(p);
        });
      }
    });
  });
  
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const errorContainer = document.getElementById("formErrors");
    errorContainer.innerHTML = "";
  
    let errors = [];
  
    if (name === "") errors.push("Name is required.");
    if (email === "") {
      errors.push("Email is required.");
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) errors.push("Please enter a valid email address.");
    }
    if (message === "") errors.push("Message is required.");
  
    if (errors.length > 0) {
      errorContainer.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
      return false;
    }
  
    return true;
  }
  