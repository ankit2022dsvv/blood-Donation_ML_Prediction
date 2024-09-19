
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedback-form");
  const reviewText = document.getElementById("review-text");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    submitReview(reviewText.value);
  });
});

function submitReview(review) {
  // Here you can perform any action with the review data, such as sending it to a server
  // For demonstration purposes, let's just display a thank you message
  alert("Thank you for sharing your experience with us!");
}

$(document).ready(function() {
  $('#donation-form').submit(function(e) {
      e.preventDefault();
      
      var formData = {
          username: $('input[name="username"]').val(),
          email: $('input[name="email"]').val(),
          password: $('input[name="password"]').val(),
          mobileNumber: $('input[name="mobileNumber"]').val(),
          address: $('input[name="address"]').val(),
          name: $('input[name="name"]').val(),
          dob: $('input[name="dob"]').val(),
          weight: parseInt($('input[name="weight"]').val()),
          gender: $('select[name="gender"]').val(),
          isHuman: $('input[name="isHuman"]').prop('checked')
      };
      
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/users',
          contentType: 'application/json',
          data: JSON.stringify(formData),
          success: function(response) {
              alert('Registration successful!');
              // Additional handling if needed, like redirecting to a new page
          },
          error: function(xhr, status, error) {
              console.error('Error:', error);
              alert('Error occurred. Please try again later.');
          }
      });
  });
});
