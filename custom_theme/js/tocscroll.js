const createAnchorList = () =>
  (window.anchors = Array.from(
    document.querySelectorAll(
      "#content > h1, #content > h2, #content > h3, #content > h4"
    )
  ));

const disableArrow = () =>
  document.querySelector("img#expand_icon")?.classList.add("nodisplay");

function scrollListener() {
  const scrollTop = window.scrollY;
  removeAllActive();

  const anchorTops = window.anchors.map((a) => a.offsetTop);
  anchorTops.push(document.body.offsetHeight); // Handle edge case at bottom

  let current = null;
  for (let i = 0; i < window.anchors.length; i++) {
    const athird = i > 0 ? (anchorTops[i] - anchorTops[i - 1]) / 3 : 520;
    if (
      scrollTop >= anchorTops[i] - athird &&
      (i === anchorTops.length - 1 || scrollTop < anchorTops[i + 1])
    ) {
      current = window.anchors[i].id;
    }
  }

  // Handle bottom of page explicitly to ensure last item is highlighted
  if (
    window.anchors.length > 0 &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
  ) {
    current = window.anchors[window.anchors.length - 1].id;
  }

  if (!current && window.anchors.length === 0) {
    currentActive(true);
    disableArrow();
    window.removeEventListener("scroll", scrollListener);
    return;
  }

  const elem = document.querySelector(`nav ul li a[href="#${CSS.escape(current)}"]`);
  if (elem) elem.classList.add("active");
}

function removeAllActive() {
  for (let i = 0; i < window.anchors.length; i++) {
    const link = document.querySelector(
      `nav ul li a[href="#${CSS.escape(window.anchors[i].id)}"]`
    );
    if (link) link.classList.remove("active");
  }
}

function currentActive(override = false) {
  if (!(window.anchors.length === 0 && !override)) {
    document.querySelector("#current > a")?.classList.toggle("active");
  }
}

function collapseCurrent() {
  document.querySelector("#current ul.toc")?.classList.toggle("nodisplay");
  currentActive();
}

window.addEventListener("load", () => {
  createAnchorList();
  scrollListener(); // Initial check
});

window.addEventListener("scroll", scrollListener);
