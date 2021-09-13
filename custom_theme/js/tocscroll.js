var anchors;
var anchor_tops = [];

$(function() {
    window.anchors = $('body').find("h1:not('.site-name'):not('.article-title'), h2, h3, h4");
	for (var i = 0; i < anchors.length; i++) {
		window.anchor_tops.push(Math.trunc($(anchors[i]).offset().top));
	}
	window.anchor_tops.push($(document).height());
	window.anchor_tops.sort((a,b) => a - b);
	myFunc(); // call initially so that there isn't everything inactive
});


function myFunc() {
	var scrollTop = $(document).scrollTop();
	for (var i = 0; i < anchors.length; i++) {
		$('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
		if (i > 0) {
			var athird = (anchor_tops[i] - anchor_tops[i-1])/3;
		} else {
			var athird = 180;
		}

		if (scrollTop >= (anchor_tops[i] - athird) && scrollTop < anchor_tops[i+1]) {
			var current = $(anchors[i]).attr('id');
		}
	}
	$('nav ul li a[href="#' + current + '"]').addClass('active');
}

$(window).scroll(function(){
   myFunc();
});
