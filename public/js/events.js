tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
};

showPlayers = (event) => {
    const el = event.currentTarget.closest('.players-content');
    if(el.classList.contains('open')){
        el.classList.remove('open');
        return;
    }
    el.classList.add('open');
}