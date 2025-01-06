const createAnchorList = () =>
  (window.anchors = Array.from(
    document.querySelectorAll(
      "#content > h1, #content > h2, #content > h3, #content > h4"
    )
  ));

const disableArrow = () =>
  document.querySelector("img#expand_icon").classList.add("nodisplay");

function scrollListener() {
  const scrollTop = window.scrollY;
  removeAllActive();

  const anchor_tops = window.anchors.map((a) => a.offsetTop);
  anchor_tops.push(document.body.offsetHeight);
  anchor_tops.sort((a, b) => a - b);

  let current;
  // i have no idea what this is doing, have fun! -- sink
  for (let i = 0; i < window.anchors.length; i++) {
    const athird = i > 0 ? (anchor_tops[i] - anchor_tops[i - 1]) / 3 : 520;

    if (
      scrollTop >= anchor_tops[i] - athird &&
      (i === anchor_tops.length - 1 || scrollTop < anchor_tops[i + 1])
    )
      current = anchors[i].id;
  }

  if (window.anchors.length === 0) {
    // if undefined, means no headers
    currentActive(true);
    disableArrow();
    window.removeEventListener("scroll", scrollListener);
  }

let elem = document.querySelector('nav ul li a[href="#' + current + '"]');
if (elem) elem.classList.add("active");
}

function removeAllActive() {
  for (let i = 0; i < window.anchors.length; i++)
    document
      .querySelector('nav ul li a[href="#' + anchors[i].id + '"]')
      .classList.remove("active");
}

function currentActive(override = false) {
  if (!(window.anchors.length === 0 && !override))
    document.querySelector("#current > a").classList.toggle("active");
}

// noinspection JSUnusedGlobalSymbols - used in some of the html templates
function collapseCurrent() {
  document.querySelector("#current ul.toc").classList.toggle("nodisplay");
  currentActive();
}

window.addEventListener("load", () => {
  createAnchorList();
  scrollListener(); // call initially so that there isn't everything inactive
});

window.addEventListener("scroll", scrollListener);
