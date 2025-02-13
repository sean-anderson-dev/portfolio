document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        // Hide all containers
        document.querySelectorAll('.container').forEach(container => {
            container.classList.add('hidden');
        });

        // Show the corresponding container
        const skill = card.getAttribute('data-skill');
        document.getElementById(skill).classList.remove('hidden');
    });
});
