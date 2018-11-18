$(document).ready(function () {
	$(".popup_box").hide();

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
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\      Result: <h2></div>");
					$.each(result, function (index, value) {
						if (value.title.indexOf(keywords) != -1) {
							createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
						}
					});
					$('.preview').click(function () {
						previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
					});
					$('#popup_close').click(function () {
						$('.popup_box').fadeOut();
						$('.items-table').css('opacity', '1');
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
					$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\      Result: <h2></div>");
					$.each(result, function (index, value) {
						if (value.title.indexOf(keywords) != -1) {
							createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
						}
					});
					$('.preview').click(function () {
						previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
					});
					$('#popup_close').click(function () {
						$('.popup_box').fadeOut();
						$('.items-table').css('opacity', '1');
					});
				});
			}, 2000);
	});

	//For Category & Language Searching
	$(".sn-filter").click(function () {
		let header = $(this).attr("headers");
		let selected_type = $(this).attr("id");
		let isType = true;
		if (selected_type == "view_book" || selected_type == "view_magazine" || selected_type == "view_software") {
			isType = false;
		}
		let i = 1;
		$(".items-table").empty();
		$(".loading-animation").show();
		if (isType) {
			setTimeout(
				function () {
					$(".loading-animation").hide();
					$.getJSON("books.json", function (result) {
						$(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>" +
							header + " \\ " + selected_type +
							"<h2></div>");
						$.each(result, function (index, value) {
							if (selected_type == value.language || selected_type == value.category) {
								createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
								$('.preview').click(function () {
									previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
								});
								$('#popup_close').click(function () {
									$('.popup_box').fadeOut();
									$('.items-table').css('opacity', '1');
								});
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
					createItems((index + 1), value.title, value.country, value.language, value.imageLink, value.author);
				});
				$('.preview').click(function () {
					previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
				});
				$('#popup_close').click(function () {
					$('.popup_box').fadeOut();
					$('.items-table').css('opacity', '1');
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
							createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
						}
					});
					$('.preview').click(function () {
						previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
					});
					$('#popup_close').click(function () {
						$('.popup_box').fadeOut();
						$('.items-table').css('opacity', '1');
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

	//For Advice Searching
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
								value.pages <= pages) {
								createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
							}
						} else if (value.category == category && value.language == language && value.pages <= pages) {
							createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
						}
					});
					$('.preview').click(function () {
						previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
					});
					$('#popup_close').click(function () {
						$('.popup_box').fadeOut();
						$('.items-table').css('opacity', '1');
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

	//function for preview
	function previewBook(img, title, author) {
		$('#preview_content').empty();
		let country = ["France", "Belgium", "United Kingdom", "United States", "India", "Roman Empire"];
		let lang = ["French", "Greek", "English", "English", "Sanskrit", "Classical Latin"];
		let random = Math.floor(Math.random() * 6);
		let year = Math.floor(Math.random() * 2019);
		let page = Math.floor(Math.random() * 1000);
		let content = "<img src='" + img + "' id='preview_img' height='250px;'>" +
			"<p id='preview_content'>Title: " + title + "</p>" +
			"<p id='preview_content'>Author: " + author + "</p>" +
			"<p id='preview_content'>Country: " + country[random] + "</p>" +
			"<p id='preview_content'>Language: " + lang[random] + "</p>" +
			"<p id='preview_content'>Year: " + year + "</p>" +
			"<p id='preview_content'>Page: " + page + "</p>" +
			"<img src='images/arrowRight.png' id='arrowRight'>" +
			"<div class='messagebox'>click to view chapter</div>";
		$('#preview_content').append(content);
		$('.messagebox').hide();
		$('.popup_box').fadeIn();
		$('.items-table').css('opacity', '0.1');
		$('#arrowRight').hover(function () {
			$('.messagebox').fadeIn();
		}, function () {
			$('.messagebox').fadeOut();
		});
		$('#arrowRight').click(function () {
			viewChapter(book_content, img, title, author);
		});
	}

	//function for creating items
	function createItems(index, title, country, language, imageLink, author) {
		let str = '<div class="items">' +
			'<div><b style="margin: 10px">' + index + '</b></div>' +
			'<div class="bookName" style="margin-left: 150px;"><b>Book Title: ' + title + '</b><br/><br>' +
			'<b>Country: ' + country + '</b><br/><br/>' +
			'<b>Language: ' + language + '</b></div>' +
			'<img src = "' + imageLink + '" height="120px" style="margin: -80px 20px 10px 40px;">' +
			'<button class="preview" form="' +
			imageLink + '" name="' +
			title + '" value="' +
			author + '" style="margin-bottom: 20px;">Preview</button>' +
			'<button class="reserve" style="margin-left: 5px;">Reserve</button>' +
			'</div>';
		$(".items-table").append(str);
	}

	//for view chapter
	function viewChapter(content, img, title, author) {
		$('#preview_content').fadeOut(function () {
			$('#preview_content').empty();
		});
		$('#preview_content').fadeIn(function () {
			$('#preview_content').append(content);
			$('#preview_content').append("<button id='backTobookDetails'>< Back</button>");
			$('#nextPage').click(function () {
				$('#preview_content').empty();
				$('#preview_content').append(book_next_content);
				$('#preview_content').fadeIn();
				$('#preview_content').append("<button id='backTobookDetails'>< Back</button>");
				$('#frontPage').click(function () {
					$('#preview_content').empty();
					$('#preview_content').append(content);
					$('#preview_content').fadeIn();
					$('#preview_content').append("<button id='backTobookDetails'>< Back</button>");
					viewPage(img, title, author);
					$('#backTobookDetails').click(function () {
						previewBook(img, title, author);
					});
				});
				$('#backTobookDetails').click(function () {
					previewBook(img, title, author);
				});
			});
			$('#backTobookDetails').click(function () {
				previewBook(img, title, author);
			});
		});
	}

	function viewPage(img, title, author) {
		$('#nextPage').click(function () {
			$('#preview_content').empty();
			$('#preview_content').append(book_next_content);
			$('#preview_content').fadeIn();
			$('#preview_content').append("<button id='backTobookDetails'>< Back</button>");
			$('#frontPage').click(function () {
				$('#preview_content').empty();
				$('#preview_content').append(book_content);
				$('#preview_content').fadeIn();
				$('#preview_content').append("<button id='backTobookDetails'>< Back</button>");
				viewPage();
				$('#backTobookDetails').click(function () {
					previewBook(img, title, author);
				});
			});
			$('#backTobookDetails').click(function () {
				previewBook(img, title, author);
			});
		});
		$('#backTobookDetails').click(function () {
			previewBook(img, title, author);
		});
	}

	var book_content = '<div class="book_bg">' +
		'<div class="pageB"><h2>Chapter 1</h2><p>Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you 	very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense. </p><p>Mr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son called Dudley and in their opinion there was no finer boy anywhere. </p></div>' +
		'<div class="pageN"><p>The Dursleys had everything they wanted, but they also had a secret, and their greatest fear was that somebody would discover it. They didn\'t think they could bear it if anyone found out about the Potters. Mrs. Potter was Mrs. Dursley\'s sister, but they hadn\'t met for several years; in fact, Mrs. Dursley pretended she didn\'t have a sister, because her sister and her good-for-nothing husband were as unDursleyish as it was possible to be. </p><p>The Dursleys shuddered to think what the neighbors would say if the Potters arrived in the street. The Dursleys knew that the Potters had a small son, too, but they had never even seen him. This boy was another good reason for keeping the Potters away; they didn\'t want Dudley mixing with a child like that.</p><br/><br/><br/><a style="margin-left: 170px;" id="nextPage">click to next page<a></div>' +
		'</div>';

	var book_next_content = '<div class="book_bg">' +
		'<div class="pageB"><p>When Mr. and Mrs. Dursley woke up on the dull, gray Tuesday our story starts, there was nothing about the cloudy sky outside to suggest that strange and mysterious things would soon be happening all over the country. Mr. Dursley hummed as he picked out his most boring tie for work, and Mrs. Dursley gossiped away happily as she wrestled a screaming Dudley into his high chair.</p><p>None of them noticed a large, tawny owl flutter past the window. At half past eight, Mr. Dursley picked up his briefcase, pecked Mrs. Dursley on the cheek, and tried to kiss Dudley good-bye but missed, because Dudley was now having a tantrum and throwing his cereal at the walls. "Little tyke," chortled Mr. Dursley as he left the house. He got into his car and backed out of number four\'s drive. </p><br/><br/><a id="frontPage">click to front page</a></div>' +
		'<div class="pageN"><p>It was on the corner of the street that he noticed the first sign of something peculiar — a cat reading a map. For a second, Mr. Dursley didn\'t realize what he had seen — then he jerked his head around to look again. There was a tabby cat standing on the corner of Privet Drive, but there wasn\'t a map in sight. What could he have been thinking of? It must have been a trick of the light. Mr. Dursley blinked and stared at the cat. It stared back. As Mr. Dursley drove around the corner and up the road, he watched the cat in his mirror.</p><p> It was now reading the sign that said Privet Drive — no, looking at the sign; cats couldn\'t read maps or signs. Mr. Dursley gave himself a little shake and put the cat out of his mind. As he drove toward town he thought of nothing except a large order of drills he was hoping to get that day.</p><a>---End---</a></div>' +
		'</div>';
});
