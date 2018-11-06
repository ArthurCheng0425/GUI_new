$(document).ready(function () {
  $(".animation_container").hide()
  $("#reset_num").append('<img src="images/cross.png" height="10px">');
  $("#reset_alp").append('<img src="images/cross.png" height="10px">');
  $("#reset_sym").append('<img src="images/cross.png" height="10px">');
  $("#reset_password").keyup(function () {
    var strength = 0; // check password strength
    var password = $("input[name=password]")
    var message = $("#text_show"); // message for password strength
    var color = $("#password_strength"); // password strength bar color
    console.log("reseting");

    if (password.val().length > 0) {
      // user input some characters
      strength = 1;
      if (password.val().length == 7)
        strength = 2;
      // If password contains both lower and uppercase characters, increase strength value.
      if (password.val().match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
        strength = 3;
      // If it has numbers and characters, increase strength value.
      if (password.val().match(/([a-zA-Z])/) && password.val().match(/([0-9])/))
        strength = 4;
      // If it has one special character, increase strength value.
      if (password.val().match(/([!,%,&,@,#,$,^,*,?,_,~])/))
        strength = 5;
      // If it has two special characters, increase strength value.
      if (password.val().match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
        strength = 6;

      //show password has
      //Number
      if (password.val().match(/([0-9])/))
        $('#reset_num').html('Number <img src="images/tick.png" height="10px;">');
      //Alphabet
      if (password.val().match(/([a-z])/) || password.val().match(/([A-Z])/))
        $('#reset_alp').html('Alphabet <img src="images/tick.png" height="10px;">');
      //Simbol
      if (password.val().match(/([!,%,&,@,#,$,^,*,?,_,~])/))
        $('#reset_sym').html('Symbol <img src="images/tick.png" height="10px;">');

      console.log("strength: " + strength);

      // show text
      if (strength <= 2) {
        message.text("Weak");
        color.css("backgroundColor", "red");
        color.css("width", "30%");
      } else if (strength <= 4) {
        message.text("Good");
        color.css("backgroundColor", "orange");
        color.css("width", "60%");
      } else {
        message.text("Strong");
        color.css("backgroundColor", "green");
        color.css("width", "100%");
      }
    } else {

      // user no input anything
      message.text("");
      color.css("width", "0%");
      strength = 0;
      console.log("strength: " + strength);
    }

    //show password doesn't have
    //Number
    if (!password.val().match(/([0-9])/))
      $('#reset_num').html('Number <img src="images/cross.png" height="10px;">');
    //Alphabet
    if (!password.val().match(/([a-z])/) || password.val().match(/([A-Z])/))
      $('#reset_alp').html('Alphabet <img src="images/cross.png" height="10px;">');
    //Simbol
    if (!password.val().match(/([!,%,&,@,#,$,^,*,?,_,~])/))
      $('#reset_sym').html('Symbol <img src="images/cross.png" height="10px;">');

    //Ready to login
    $("#reset-button").click(function () {
      if (password.val() == $("#comfirm_reset_password").val() && password.val().length > 1) {
        if(password.val() == "student_1")
          location.href = "main.html";
        else if(password.val() == "teach_staff_1")
          location.href = "teach_staff.html";
        else if(password.val() == "non_teach_staff_1")
          location.href = "non_teach_staff.html";
        else if(password.val() == "alumni_1")
          location.href = "alumni.html";
      } else {
        message.html('<b style="color: red;">Password is not same !</b>');
      }
    });
  });

});