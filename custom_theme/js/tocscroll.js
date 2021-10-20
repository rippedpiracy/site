$(function() {
	createAnchorList();
	myFunc(); // call initially so that there isn't everything inactive
});

function createAnchorList() {
	window.anchors = document.querySelectorAll("#content > h1, #content > h2, #content > h3, #content > h4");
	/*
	for (var i = 0; i < window.anchors.length; i++) {
		window.anchor_tops.push($(window.anchors[i]).offset().top);
	}
	window.anchor_tops.push($(document).height());
	window.anchor_tops.sort((a,b) => a - b);
	*/
}

function disableArrow() {
    $('img#expand_icon').addClass('nodisplay');
}


function myFunc() {
	var scrollTop = $(document).scrollTop();
    removeAllActive();
	var anchor_tops = [];
	for (var i = 0; i < window.anchors.length; i++) {
		anchor_tops.push($(window.anchors[i]).offset().top);
	}
	anchor_tops.push($(document).height());
	anchor_tops.sort((a,b) => a - b);

	for (var i = 0; i < window.anchors.length; i++) {
		if (i > 0) {
			var athird = (anchor_tops[i] - anchor_tops[i-1])/3;
		} else {
			var athird = 520;
		}

		if (scrollTop >= (anchor_tops[i] - athird) && (i == anchor_tops.length - 1 || scrollTop < anchor_tops[i+1])) {
			var current = $(anchors[i]).attr('id');
		}
	}
    if (window.anchors.length == 0) { // if undefined, means no headers
        currentActive(true);
        disableArrow();
        $(window).off("scroll", myFunc);
    }
	$('nav ul li a[href="#' + current + '"]').addClass('active');
}

function removeAllActive() {
    for (var i = 0; i < window.anchors.length; i++) {
		$('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
    }
}

function currentActive(override = false) {
    if (window.anchors.length == 0 && override == false) {
        return;
    }

    var a = $("#current > a")
    if ($(a).hasClass('active')) {
        $(a).removeClass('active');
    } else {
        $(a).addClass('active');
    }
}


function collapseCurrent() {
    var e = $( "#current ul.toc" );
    if ($(e).hasClass("nodisplay")) {
        $(e).removeClass("nodisplay");
    } else {
        $(e).addClass("nodisplay");
    }
    currentActive();
}


//$(window).scroll(function(){
//   myFunc();
//});
$(window).scroll(myFunc);
