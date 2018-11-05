$(document).ready(function () {
	// show page animation
	$(".full-container").hide();

	$(".animation_container").animate({
		opacity: '1'
	}, 2000);
	// end

	// show progress bar animation
	var progress_number = 0;
	var progress_blue_bar = $(".progress");
	var progress_message = $(".progress_message");

	$(".animation_container").delay(500).show(function () {
		var callProgress = setInterval(function () {
			progress_blue_bar.css("width", progress_number + "%");
			progress_message.html(progress_number + "%");
			progress_number++;
			
			// fade out page animation
			if (progress_number > 100) {
				clearInterval(callProgress);
				$("body").fadeOut(1500, function () {
					$(".animation_container").hide();
				}).fadeIn(500, function () {
					$(".full-container").show();
				});
			}
			// end
		}, 15);
	});
	// end
});