const sidebarWidth = 335;

window.addEventListener('resize', checkWindowSize);

// call initially
$(function() {
    checkWindowSize();
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
	//	document.body.style.overflowX = "hidden";
	}
    window.navOpen = true;
}

function closeNav() {
//  document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementById("sidebar").className = "collapsed";
    document.getElementById("content").className = "collapsed";
//    document.body.style.overflowX = "";
    window.navOpen = false;
}

function checkWindowSize() {
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
