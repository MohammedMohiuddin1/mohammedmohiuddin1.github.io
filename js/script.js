/* ==================================== typing animation ==================================== */
var typed = new Typed(".typing", {
    strings: ["Software Engineer", "Full Stack Developer", "Cloud Developer", "DSA Tutor"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
})
/* ==================================== Aside ==================================== */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length
for (let i = 0; i < totalNavList; i++) {
    console.log(navList[i])
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        //showSection(this)
    })

}
// function showSection(element)
// {
//     const target = element.getAttribute("href").split(#)[1];
//     document.querySelector('#' + target).classList.add("active")
// }

function downloadCV() {
    var link = document.createElement('a');
    link.href = 'files/muz-resume.pdf'
    link.download = 'muz-resume.pdf';
    link.click();
}

document.getElementById('downloadCvBtn').addEventListener('click', downloadCV);
