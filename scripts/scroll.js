document.querySelectorAll('.fixed.top-0 a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId); 

            
            targetElement.scrollIntoView({
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });