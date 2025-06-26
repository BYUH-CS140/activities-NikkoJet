function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const errorContainer = document.getElementById("formErrors");
    const thankYouMessage = document.getElementById("thankYouMessage");
  
    errorContainer.innerHTML = "";
    thankYouMessage.style.display = "none";
  
    const errors = [];
  
    if (name === "") errors.push("Name is required.");
    if (email === "") {
      errors.push("Email is required.");
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) errors.push("Please enter a valid email address.");
    }
    if (message === "") {
      errors.push("Message is required.");
    } else if (message.length < 10) {
      errors.push("Message must be at least 10 characters long.");
    }
  
    if (errors.length > 0) {
      errorContainer.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
      return false;
    }
  
    // Save to localStorage for demo purposes
    const existing = JSON.parse(localStorage.getItem("archivisionMessages") || "[]");
    existing.push({
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("archivisionMessages", JSON.stringify(existing));
  
    // Show thank-you message
    thankYouMessage.style.display = "block";
    document.getElementById("feedbackForm").reset();
  
    return false;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      validateForm();
    });
  });
  