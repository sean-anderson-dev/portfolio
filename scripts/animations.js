document.querySelectorAll('.imalinks').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.classList.remove('spin-once'); // reset in case it's still there
        void el.offsetWidth; // force reflow to re-trigger animation
        el.classList.add('spin-once');
    });
});
