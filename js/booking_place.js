$(document).ready(function () {
	// get current date
	var currentDay = new Date();
	currentDay.setDate(currentDay.getDate());

	// show current date
	$(".book_place_title").text(currentDay.toDateString());
	console.log("currentDay:" + currentDay.toDateString());

	// show prev date
	var prevDay = new Date();
	$(".day_button .btn_prev").click(function () {
		prevDay.setDate(prevDay.getDate() - 1);
		$(".book_place_title").text(prevDay.toDateString());
		console.log("prevDay:" + prevDay.toDateString());
	});

	// show next date
	var nextDay = new Date();
	$(".day_button .btn_next").click(function () {
		nextDay.setDate(nextDay.getDate() + 1);
		$(".book_place_title").text(nextDay.toDateString());
		console.log("nextDay:" + nextDay.toDateString());
	});

	// current day, name, time variable
	var place_day;
	var place_name;
	var place_time;

	// onload page show timetable
	$(".place_form_container").hide();
	$(".book_place").show();
	// top bar message hide
	$(".messageBox").hide();
	// animation_effect hide
	$(".animation_effect_container").hide();

	// click button will display book room form with current date value
	$(".booking_timetable td button").click(function () {
		// top bar message hide
		$(".messageBox").hide();

		var cell_index = $(this).closest("td").index();
		var row_index = $(this).closest("tr").index();

		place_day = $(".book_place_title").text();
		place_name = $(".booking_timetable th:eq(" + cell_index + ")").text();
		place_time = $(".booking_timetable tr:eq(" + row_index + ") td:eq(0)").text();

		//		console.log("cell_index:" + cell_index);
		//		console.log("row_index:" + row_index);
		//
		//		console.log("place_day:" + place_day);
		//		console.log("place_name:" + place_name);
		//		console.log("place_time:" + place_time);

		// animation_effect start
		$(".animation_effect_container").show();
		$(".animation_effect_container").animate({
			opacity: "1"
		}, 2000, function () {
			// show 3 pictures and text message during the animation time
			var picture_count = 1;
			var picture_array = ["images/book_place_img/basketball_place.jpg", "images/book_place_img/swimming_place.jpg", "images/book_place_img/table_tennis_place.jpg"];
			
			$(".animation_picture img").fadeOut(1000, function () {
				$(this).attr("src", picture_array[picture_count++]);
			}).fadeIn(1000);
			$(".animation_picture img").fadeOut(1000, function () {
				$(this).attr("src", picture_array[picture_count++]);
			}).fadeIn(1000);
		}).delay(5000).fadeOut(2000, function() {
			// fade in show book place form
			$(".place_form_container").delay(500).fadeIn(1000);
		});
		
		// timetable hide
		$(".book_place").hide();
		// animation_effect end

		$(".place_day").text(place_day);
		$(".place_name").text(place_name);
		$(".place_time").text(place_time);

		$(".place_form_container #submit").click(function () {
			$(".place_form_container").hide();
			$(".book_place").fadeIn(1000);

			//		console.log($("#student_id").val());
			//		console.log($("#student_name").val());

			if ($("#student_id").val().length != 0 && $("#student_name").val().length != 0) {
				// top bar message show text in timetable
				$(".messageBox").fadeIn(1000);
				$(".messageBox").text("Book Place Form Submit Success!");

				// show book message if book place success
				$(".booking_timetable tr:eq(" + row_index + ") td:eq(" + cell_index + ")").html("***Booked***");
				$(".booking_timetable tr:eq(" + row_index + ") td:eq(" + cell_index + ")").css("backgroundColor", "#e0e0e0");
			} else {
				$(".messageBox").fadeIn(1000);
				$(".messageBox").text("Book Place Form Submit Fail!");
			}
		});
	});

	$(".place_form_container .btn_back").click(function () {
		// timetable hide
		$(".place_form_container").hide();
		// animation_effect hide
		$(".animation_effect_container").hide();
		// fade in show book place form
		$(".book_place").fadeIn(2000);
	});
});