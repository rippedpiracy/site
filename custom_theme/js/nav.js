let lastW, lastH;

window.addEventListener("resize", checkWindowSize);

// call initially
window.addEventListener("load", () => checkWindowSize(true));

function closeOrOpen() {
  if (window.navOpen) closeNav();
  else openNav();
}

function openNav() {
  document.getElementById("sidebar").className = "open";
  const content = document.getElementById("content");
  content.className = "open";

  // if is on mobile
  if (window.innerWidth <= 767) content.onclick = () => closeOrOpen();

  window.navOpen = true;
}

function closeNav() {
  document.getElementById("sidebar").className = "closed";
  const content = document.getElementById("content");
  content.className = "";
  content.onclick = null;

  window.navOpen = false;
}

function checkWindowSize(override = false) {
  if (window.innerWidth !== lastW || window.innerHeight !== lastH || override) {
    lastW = window.innerWidth;
    lastH = window.innerHeight;

    const isOnMobile = window.innerWidth < 767;
    if (window.navOpen === undefined) {
      if (!isOnMobile) window.navOpen = true;
    } else {
      if (!navOpen && !isOnMobile) openNav();
      if (navOpen && isOnMobile) closeNav();
    }
  }
}
