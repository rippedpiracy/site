const sidebarWidth = 335;

var width = $(window).width(), height = $(window).height();

window.addEventListener('resize', checkWindowSize);

// disable swipe navigation safari
//if (window.safari) {
//  history.pushState(null, null, location.href);
//  window.onpopstate = function(event) {
//      history.go(1);
//  };
//}

$(document)
	.on('swiperight', function(e){
		if (window.navOpen == false) {
			openNav();
	}})
	.on('swipeleft', function(e) {
		if (window.navOpen == true) {
			closeNav();
	}})

// call initially
$(function() {
    checkWindowSize(true);
})

function closeOrOpen() {
    if (window.navOpen == false) {
        openNav();
    } else {
        closeNav();
    }
}

function openNav() {
//  document.getElementsByClassName("sidebar")[0].style.display = "";
	document.getElementById("sidebar").className = '';
	if (window.innerWidth > 767) {
		document.getElementById("content").className = "normal";
	} else if (window.innerWidth < 768) {
		document.getElementById("content").className = "mobileopen";
		document.getElementById("content").onclick = function(event) {
			closeOrOpen();
		}
	//	document.body.style.overflowX = "hidden";
	}
    window.navOpen = true;
}

function closeNav() {
//  document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementById("sidebar").className = "collapsed";
    document.getElementById("content").className = "collapsed";
	if (document.getElementById("content").onclick != null) {
		document.getElementById("content").onclick = null;
	}
//    document.body.style.overflowX = "";
    window.navOpen = false;
}

function checkWindowSize(override=false) {
	if(($(window).width() != width || $(window).height() != height) || override == true) {
		width = $(window).width(), height = $(window).height();

		// if navOpen is undefined, we need to do extra checks
		if (typeof window.navOpen === 'undefined') {
			if (window.innerWidth < 767) {
				closeNav();
				window.navOpen = false;
			} else {
				window.navOpen = true;
			}
		} else {
			if (navOpen == false && window.innerWidth >= 767) {
				openNav();
				window.navOpen = true;
			}
			if (navOpen == true && window.innerWidth < 767) {
				closeNav();
				window.navOpen = false;
			}
		}
	}

}
