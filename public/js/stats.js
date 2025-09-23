document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll(".toggle-btn");

    toggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const details = document.querySelector(`.details[data-id="${id}"]`);
            const arrow = document.querySelector(`.arrow[data-id="${id}"]`);

            details.classList.toggle("hidden");
            arrow.classList.toggle("rotate-180");
        });
    });
});