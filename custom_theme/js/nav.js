let lastWinDimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", checkWindowSize);

// call initially
window.addEventListener("load", () => checkWindowSize(true));

function closeOrOpen() {
  if (window.navOpen) closeNav();
  else openNav();
}

function openNav() {
  document.getElementById("sidebar").className = "";
  const content = document.getElementById("content");
  const isOnMobile = window.innerWidth <= 767;
  content.className = isOnMobile ? "mobile" : "normal";

  if (isOnMobile) content.onclick = () => closeOrOpen();

  window.navOpen = true;
}

function closeNav() {
  document.getElementById("sidebar").className = "collapsed";
  const content = document.getElementById("content");
  content.className = "collapsed";
  content.onclick = null;

  window.navOpen = false;
}

function checkWindowSize(override = false) {
  if (
    window.innerWidth !== lastWinDimensions.width ||
    window.innerHeight !== lastWinDimensions.height ||
    override
  ) {
    lastWinDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isOnMobile = window.innerWidth < 767;
    // if navOpen is undefined, we need to do extra checks
    if (window.navOpen === undefined) {
      if (isOnMobile) closeNav();
      else window.navOpen = true;
    } else {
      if (!navOpen && !isOnMobile) openNav();
      if (navOpen && isOnMobile) closeNav();
    }
  }
}
