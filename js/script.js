/* ==================================== typing animation ==================================== */
var typed = new Typed(".typing", {
    strings: ["Software Engineer", "Full Stack Developer", "Cloud Developer", "DSA Tutor"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* ==================================== Aside ==================================== */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 768) {
            aside.classList.remove("open"); /* Close sidebar on mobile after clicking a link */
        }
    });
}

function showSection(element) {
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector('#' + target).classList.add("active");
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

function downloadCV() {
    var link = document.createElement('a');
    link.href = 'files/muz-resume.pdf';
    link.download = 'muz-resume.pdf';
    link.click();
}

document.getElementById('downloadCvBtn').addEventListener('click', downloadCV);

/* For active color changing of sections while scrolling */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav a");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Adjust as needed
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });

            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");
        });
    });
});
