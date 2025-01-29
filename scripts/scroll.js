document.querySelectorAll('.fixed.top-0 a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Check if it's an internal link (starts with #)
        if (targetId.startsWith("#")) {
            e.preventDefault(); // Only prevent default for internal links
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    });
});
