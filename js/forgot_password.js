$(document).ready(function () {
  $("#submit_email").click(function () {
    $(".login-icon-field").slideUp();
    $(".call-to-action").slideUp();
    $(".login-form").slideUp(function () {
      $(".login-form").html("We will send the new password to your email.Please ckeck your email.");
      $("#submit_email").text("Go Back!");
      $("#submit_email").css("background-color", "orange");
      $(".login-form").slideDown().delay(1000);
      $(".call-to-action").slideDown(function () {
        $("#submit_email").click(function () {
          location.href = "login.html";
        });
      });
    });
  });
});