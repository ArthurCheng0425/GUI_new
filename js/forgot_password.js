$(document).ready(function () {
	$("#submit_email").click(function () {
		if ($("#email_input").val().length > 0) {
			location.href = "password_question.html";
		} else {
			// red text error message
			$("#error_message").css("color", "red");
			$("#error_message").html("You must input an email address.");
		}
	});
});