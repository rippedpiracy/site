function switchTheme() {
  const currentIsDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", currentIsDark ? "light" : "dark");

  document.documentElement.classList.toggle("dark");
}

// Get the current theme from local storage
if (localStorage.getItem("theme") === "dark")
  document.documentElement.classList.add("dark");
