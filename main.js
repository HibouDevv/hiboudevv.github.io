document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Typewriter effect for h1
    const h1 = document.querySelector("h1");
    const h1Text = "i am hiboudev.";
    h1.textContent = "";
    let i = 0;
    function typeWriter() {
        if (i < h1Text.length) {
            h1.textContent += h1Text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    typeWriter();

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