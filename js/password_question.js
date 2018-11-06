$(document).ready(function () {
	// onload page will display cross image
	$("#question_1_img").append('<img src="images/cross.png" height="10px">');
	$("#question_2_img").append('<img src="images/cross.png" height="10px">');
	$("#code_confirmation").hide();
	$("#confirm_code_button").hide();

	// it will check user input something or not (Question 1)
	$("#answer_1").keyup(function () {
		// question1
		if ($("#answer_1").val().length > 0) {
			$("#question_1_img").html('Question 1 <img src="images/tick.png" height="10px;">');
		}

		if (!$("#answer_1").val().length > 0) {
			$("#question_1_img").html('Question 1 <img src="images/cross.png" height="10px;">');
		}
	});

	// it will check user input something or not (Question 2)
	$("#answer_2").keyup(function () {
		// question2
		if ($("#answer_2").val().length > 0) {
			$("#question_2_img").html('Question 2 <img src="images/tick.png" height="10px;">');
		}

		if (!$("#answer_2").val().length > 0) {
			$("#question_2_img").html('Question 2 <img src="images/cross.png" height="10px;">');
		}
	});

	// user click submit button
	$("#submit_code_button").click(function () {
		// check user input something in Question 1 and Question 2
		if ($("#answer_1").val().length > 0 && $("#answer_2").val().length > 0) {
			$(".question-icon-field").slideUp();
			$(".call-to-action").slideUp();

			$(".question-form").slideUp(function () {
				$(".question-form").html("Confirmation code has been sent to your email.");

				// Confirm button
				$("#confirm_code_button").text("Confirm");
				$("#confirm_code_button").css("background-color", "orange");

				// hide submit_code_button
				$("#submit_code_button").hide();

				// display code input field and confirm button
				$("#code_confirmation").show();
				$("#confirm_code_button").show();

				// slide down show input field
				$(".code_confirmation").slideDown().delay(1000);

				// slide down show confirm button
				$(".call-to-action").slideDown(function () {
					$("#confirm_code_button").click(function () {
						if ($("#confirm_code_input").val().length > 0) {
							location.href = "first_reset.html";
						} else {
							$(".code_confirm_message").css("color", "red");
							$(".code_confirm_message").html("You must input your confirmation code.");
						}
					});
				});
			});
		} else {
			// red text error message
			$(".question_error_message").css("color", "red");
			$(".question_error_message").html("You must fill in Question 1 and Question 2.");
		}
	});
});