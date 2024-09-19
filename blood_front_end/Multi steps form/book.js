document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("appointmentForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Show confirmation message
    confirmationMessage.textContent = "Thanks for booking with us!";
    confirmationMessage.style.display = "block";
    
    // Redirect after delay
    setTimeout(function() {
      window.location.href = "../index.html";
    }, 1500); // Redirect after 2 seconds (2000 milliseconds)
  });
});
