document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const errorBox = document.getElementById("formErrors");
    const thankYou = document.getElementById("thankYouMessage");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent default form submission
      let errors = [];
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
  
      // Validate name
      if (name.length < 2) {
        errors.push("Name must be at least 2 characters.");
      }
  
      // Validate email using proper regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
      }
  
      // Validate message
      if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
      }
  
      // Show errors if any
      errorBox.innerHTML = "";
      if (errors.length > 0) {
        errors.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          p.style.color = "red";
          errorBox.appendChild(p);
        });
        thankYou.style.display = "none";
        return;
      }
  
      // Store the message in localStorage for demo purposes
      const storedMessages = JSON.parse(localStorage.getItem("archivisionMessages") || "[]");
      storedMessages.push({ name, email, message, time: new Date().toISOString() });
      localStorage.setItem("archivisionMessages", JSON.stringify(storedMessages));
  
      // Show thank you and reset form
      thankYou.style.display = "block";
      form.reset();
      errorBox.innerHTML = "";
    });
  });
  