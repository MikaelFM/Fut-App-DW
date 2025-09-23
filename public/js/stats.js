document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".cursor-pointer");
    const details = document.getElementById("details-game1");
    const arrow = document.getElementById("arrow-game1");

    toggleBtn.addEventListener("click", () => {
        details.classList.toggle("hidden");
        arrow.classList.toggle("rotate-180");
    });
});