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


const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    
    const rect = target.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }
  
  for(const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
  }