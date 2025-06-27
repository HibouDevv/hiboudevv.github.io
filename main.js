document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            themeIcon.textContent = "☀️";
            toggleBtn.title = "Toggle Light Mode";
        } else {
            body.classList.remove("dark-mode");
            themeIcon.textContent = "🌙";
            toggleBtn.title = "Toggle Dark Mode";
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark");

    toggleBtn.addEventListener("click", function () {
        const isDark = !body.classList.contains("dark-mode");
        setTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});