/* =============== Toggle Style Switcher ================ */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

// Hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* =============== Theme Colors ================ */
const alternateStyles = document.querySelectorAll(".alternate-style");
const colorSpans = document.querySelectorAll(".colors span");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled", "true");
        }
    });
    
    // Update active color indicator
    colorSpans.forEach(span => {
        span.classList.remove("active");
        if (span.classList.contains("color-" + color.split("-")[1])) {
            span.classList.add("active");
        }
    });
    
    // Save selected color to localStorage
    localStorage.setItem("color", color);
}

/* =============== Theme Light and Dark mode ================ */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    
    // Save theme preference to localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
})

/* =============== Matrix Theme ================ */
const matrixMode = document.querySelector(".matrix-mode");
const matrixThemeStyle = document.getElementById("matrix-theme-style");

matrixMode.addEventListener("click", () => {
    document.body.classList.toggle("matrix-theme");
    // Visual feedback on button click
    matrixMode.classList.toggle("active");
    
    // Disable animated background if active
    if (document.body.classList.contains("animated-bg")) {
        document.body.classList.remove("animated-bg");
    }
    
    // Toggle matrix theme stylesheet
    if (document.body.classList.contains("matrix-theme")) {
        matrixThemeStyle.disabled = false;
        localStorage.setItem("matrix-theme", "enabled");
        localStorage.setItem("animated-bg", "disabled");
    } else {
        matrixThemeStyle.disabled = true;
        localStorage.setItem("matrix-theme", "disabled");
    }
});

/* =============== Load saved preferences ================ */
window.addEventListener("load", () => {
    // Check saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
    
    // Check saved color
    const savedColor = localStorage.getItem("color");
    if (savedColor) {
        setActiveStyle(savedColor);
        
        // Update active color indicator
        colorSpans.forEach(span => {
            if (span.classList.contains("color-" + savedColor.split("-")[1])) {
                span.classList.add("active");
            }
        });
    } else {
        // Set default color if none saved
        setActiveStyle("color-1");
        document.querySelector(".color-1").classList.add("active");
    }
    
    // Check if matrix theme was previously enabled
    if (localStorage.getItem("matrix-theme") === "enabled") {
        document.body.classList.add("matrix-theme");
        matrixMode.classList.add("active");
        matrixThemeStyle.disabled = false;
    }
});