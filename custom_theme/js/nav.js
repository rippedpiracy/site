window.addEventListener('resize', checkWindowSize);

// call initially
$(function() {
    checkWindowSize();
})

var navOpened;

function closeOrOpen() {
    if (window.navOpened == false) {
        openNav();
    } else {
        closeNav();
    }
}

function openNav() {
//  document.getElementsByClassName("sidebar")[0].style.display = "";
    document.getElementsByClassName("sidebar")[0].style.marginLeft = "0px";
    document.getElementsByTagName("main")[0].style.marginLeft = "335px";
    window.navOpened = true;
}

function closeNav() {
//  document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementsByClassName("sidebar")[0].style.marginLeft = "-335px";
    document.getElementsByTagName("main")[0].style.marginLeft = "0";
    window.navOpened = false;
}

function checkWindowSize() {
    // if navOpened is undefined, we need to do extra checks
    if (typeof window.navOpen === 'undefined') {
        if (window.innerWidth < 747) {
            closeNav();
            window.navOpen = false;
        } else {
            window.navOpen = true;
        }
    } else {
        if (navOpen == false && window.innerWidth >= 747) {
            openNav();
            window.navOpen = true;
        }
        if (navOpen == true && window.innerWidth < 747) {
            closeNav();
            window.navOpen = false;
        }
    }
}
