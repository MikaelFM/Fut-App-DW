function filterGames(status) {
    const cards = document.querySelectorAll('.game-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600');
        btn.classList.add('bg-gray-700', 'text-gray-300');
    });

    const activeBtn = document.querySelector(`[data-status="${status}"]`);
    activeBtn.classList.add('active', 'bg-blue-600');
    activeBtn.classList.remove('bg-gray-700', 'text-gray-300');

    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterGames(btn.dataset.status);
    });
});

document.querySelector('.filter-btn[data-status="aberto"]').click();