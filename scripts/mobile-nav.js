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