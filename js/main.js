$(document).ready(function () {

	$("button").mouseover(function () {
		$(this).css("cursor", "pointer");
	});

	$("td").mouseover(function () {
		$(this).css("cursor", "pointer");
	});

	$(".sn-filter").hover(function () {
		$(this).append('<img src="images/tick.png" height="10px;" name="tick">');
		$(".sn-filter").mouseleave(function () {
			$(".sn-filter img:last-child").remove();
		});
	});

	// permission function link hover effect
	$(".permission_function a").hover(function () {
		$(this).append('<img src="images/tick.png" height="10px;" name="tick">');
		$(".permission_function a").mouseleave(function () {
			$(".permission_function a img:last-child").remove();
		});
	});

	$("#logo").click(function () {
		location.href = "main.html";
	});

	//For Reload page & view all
	showBook();
	$("#view_book").click(function () {
		showBook();
	});
	$("#view_software").click(function () {
		showSoftware();
	});
	$("#view_magazine").click(function () {
		showMagazine();
	});

	//For keywords Searching
	$("#go").click(function () {
		let keywords = $("#search_bar").val();
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("books.json", function (result) {
					console.log("success");
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\      Result: <h2></div>");
					$.each(result, function (index, value) {
						if (value.title.indexOf(keywords) != -1) {
							let str = '<div class="items">' +
								'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
								'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
								'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
								'</div>';
							console.log(value.title + " " + keywords);
							$(".items-table").append(str);
						}
					});
				});
			}, 2000);
	});

	//For keywords Searching
	$("#search_bar").change(function () {
		let keywords = $("#search_bar").val();
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("books.json", function (result) {
					console.log("success");
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\      Result: <h2></div>");
					$.each(result, function (index, value) {
						if (value.title.indexOf(keywords) != -1) {
							let str = '<div class="items">' +
								'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
								'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
								'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
								'</div>';
							console.log(value.title + " " + keywords);
							$(".items-table").append(str);
						}
					});
				});
			}, 2000);
	});

	//For Category & Language Searching
	$(".sn-filter").click(function () {
		let header = $(this).attr("headers");
		let selected_type = $(this).attr("id");
		let isType = true;
		if(selected_type == "view_book" || selected_type == "view_magazine" || selected_type == "view_software"){
			isType = false;
		}
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		if(isType){
			setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("books.json", function (result) {
					console.log(($(this).attr("id")));
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>" +
						header + " \\ " + selected_type +
						"<h2></div>");
					$.each(result, function (index, value) {
						if (selected_type == value.language || selected_type == value.category) {
							let str = '<div class="items">' +
								'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
								'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
								'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
								'</div>';
							console.log("success");
							$(".items-table").append(str);
						}
					});
				});
			}, 2000);	
		}
	});

	//For PUBLICATION DATE Searching
	$("#from").on("change", function () {
		publicationDate();
	});
	$("#to").on("change", function () {
		publicationDate();
	});

	//function for show all items
	function showBook() {
		$(".items-table").empty();
		$(".loading-animation").delay(2000).show(function () {
			$(".loading-animation").hide();
			$.getJSON("books.json", function (result) {
				$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Book<h2></div>");
				$.each(result, function (index, value) {
					let str = '<div class="items">' +
						'<div><b style="margin: 10px">' + (index + 1) + '</b></div>' +
						'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
						'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
						'</div>';
					$(".items-table").append(str);
				});
			});
		});
	}

	//function for show all items for software
	function showSoftware() {
		$(".items-table").empty();
		$(".loading-animation").delay(2000).show(function () {
			$(".loading-animation").hide();
			$.getJSON("software.json", function (result) {
				$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Software<h2></div>");
				$.each(result, function (index, value) {
					let str = '<div class="items">' +
						'<div><b style="margin: 10px">' + (index + 1) + '</b></div>' +
						'<div class="bookName" style="margin-left: 150px;"><b>Software Name: ' + value.name + '</b></div>' +
						'<img src = "' + value.image + '" height="100px" style="margin: -10px 20px 10px 40px">' +
						'</div>';
					$(".items-table").append(str);
				});
			});
		});
	}
	
	//function for show all items for magazine
	function showMagazine() {
		$(".items-table").empty();
		$(".loading-animation").delay(2000).show(function () {
			$(".loading-animation").hide();
			$.getJSON("magazine.json", function (result) {
				$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Magazine<h2></div>");
				$.each(result, function (index, value) {
					let str = '<div class="items">' +
						'<div><b style="margin: 10px">' + (index + 1) + '</b></div>' +
						'<div class="bookName" style="margin-left: 150px;"><b>Magazine Title: ' + value.name + '</b></div>' +
						'<img src = "' + value.image + '" height="120px" style="margin: -10px 20px 10px 40px">' +
						'</div>';
					$(".items-table").append(str);
				});
			});
		});
	}

	//function for date searching
	function publicationDate() {
		let from = $("#from").val();
		let to = $("#to").val();
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		console.log("called");
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("books.json", function (result) {
					console.log("success");
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>From " + from + " To " + to + " Year \\      Result: <h2></div>");
					$.each(result, function (index, value) {
						if (value.year >= from && value.year <= to) {
							let str = '<div class="items">' +
								'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
								'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
								'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
								'</div>';
							$(".items-table").append(str);
						}
					});
				});
			}, 2000);
	}

	//Hover effect
	$("#go").hover(function () {
		$("#go").css("background-color", "blue");
		$("#go").mouseleave(function () {
			$("#go").css("background-color", "midnightblue");
		});
	});

	$("#search_bar").mouseover(function () {
		$("#search_bar").css("background-color", "#fffaf0");
		$("#search_bar").mouseleave(function () {
			$("#search_bar").css("background-color", "white");
		});
	});

	$(".headText").hover(function () {
		$(this).animate({
			fontSize: "16px"
		}, 300);
	});
	$(".headText").mouseleave(function () {
		$(this).animate({
			fontSize: "12px"
		}, 300);
	});

	//for advance searching
	$(".advance_search_bar").slideUp().hide();
	var as_count = 0;
	$("#advance_search").click(function () {
		if (as_count++ % 2 == 0) {
			$(".advance_search_bar").slideDown().show();
		} else {
			$(".advance_search_bar").slideUp();
		}
	});

	//For keywords Searching
	$("#as_btn").click(function () {
		let category = $("#as_category").val();
		let language = $("#as_language").val();
		let pages = $("#as_page").val();
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("books.json", function (result) {
					console.log("success");
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>advance_search \\ Result: <h2></div>");
					$.each(result, function (index, value) {
						if (language == "others") {
							if (value.category == category &&
								value.language != "English" &&
								value.language != "French" &&
								value.language != "Italian" &&
								value.pages >= pages) {
								let str = '<div class="items">' +
									'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
									'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
									'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
									'</div>';
								$(".items-table").append(str);
							}
						} else if (value.category == category && value.language == language && value.pages >= pages) {
							let str = '<div class="items">' +
								'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
								'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + value.title + '</b></div>' +
								'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
								'</div>';
							$(".items-table").append(str);
						}
					});
				});
			}, 2000);
	});

	//for top right user infomation
	var userInfoCount = 0;
	$(".user_info_container").hide();
	$("#myAccount").click(function () {
		if (userInfoCount++ % 2 == 0)
			$(".user_info_container").fadeIn();
		else
			$(".user_info_container").hide();
	});

	//for logout
	$(".logout_btn").click(function () {
		location.href = "login.html";
	});

	// student room booking function
	$("#room_booking").click(function () {
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Room Booking<h2></div>");

				// load all the elements from booking_room.html
				$.ajax({
					url: 'booking_room.html',
					success: function (page_elements) {
						$(".items-table").append(page_elements);
					},
					dataType: 'html'
				})
			}, 2000);
	});

	// teach_staff test paper function
	$("#test_paper").click(function () {
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$.getJSON("test_paper.json", function (result) {
					console.log("success");
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Test Paper<h2></div>");
					$.each(result, function (index, value) {
						let str = '<div class="items">' +
							'<div><b style="margin: 10px">' + (i++) + '</b></div>' +
							'<div class="pageName" style="margin-left: 150px;"><b>Page Title: ' + value.title + '</b></div>' +
							'<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
							'</div>';
						$(".items-table").append(str);
					});
				});
			}, 2000);
	});

	// non teach staff and alumni place booking function
	$("#place_booking").click(function () {
		$(".items-table").empty();
		$(".loading-animation").show();
		setTimeout(
			function () {
				$(".loading-animation").hide();
				$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Place Booking<h2></div>");

				// load all the elements from booking_room.html
				$.ajax({
					url: 'booking_place.html',
					success: function (page_elements) {
						$(".items-table").append(page_elements);
					},
					dataType: 'html'
				})
			}, 2000);
	});
});