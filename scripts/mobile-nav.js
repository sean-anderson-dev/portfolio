// mobile menu toggle event
const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenuButton = document.getElementById("close-menu");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });

    // Close the menu if user clicks outside it
    mobileMenu.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            mobileMenu.classList.add("hidden");
        }
    });

// mobile menu selected section event
const navButtons = document.querySelectorAll('.nav-button');

function handleNavClick(event) {
  //remove 'active' class from all buttons
  navButtons.forEach(button => {
    button.classList.remove('active');
  });

  //add 'active' class to the clicked button
  event.currentTarget.classList.add('active');
}

//add a click event listener to each button
navButtons.forEach(button => {
  button.addEventListener('click', handleNavClick);
});