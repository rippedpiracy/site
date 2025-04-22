const themeKey = "theme";
const darkClass = "dark";

// Apply stored theme on load
document.documentElement.classList.toggle(
  darkClass,
  localStorage.getItem(themeKey) === darkClass
);

function switchTheme() {
  const isDark = document.documentElement.classList.toggle(darkClass);
  localStorage.setItem(themeKey, isDark ? darkClass : "light");
}
