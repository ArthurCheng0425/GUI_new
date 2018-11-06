$(document).ready(function () {
	// jQuery & Velocity.js

	function slideUpIn() {
		$("#login").velocity("transition.slideUpIn", 1250)
	};

	function slideLeftIn() {
		$(".row").delay(500).velocity("transition.slideLeftIn", {
			stagger: 500
		})
	}

	function shake() {
		$(".password-row").velocity("callout.shake");
	}

	slideUpIn();
	slideLeftIn();
	//  $("button").on("click", function () {
	//    shake();
	//  });

	$('#here').click(function () {
		location.href = "forgot_password.html";
	});

	$("#login-button").click(function () {
		if ($("#password_input").val().length <= 0) {
			shake();
		} else {
			location.href = "first_reset.html";
		}
	})

	//	view password button
	$("#view_password").click(function () {
		if ($("#password_input").attr("type") == "password") {
			$("#password_input").attr("type", "text");
		} else {
			$("#password_input").attr("type", "password");
		}
	});

});