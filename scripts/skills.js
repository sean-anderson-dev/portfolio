// Skill descriptions data
const skillDescriptions = {
    "HTML5": "Experience building responsive, semantic HTML structures for modern web applications.",
    "CSS3": "Skilled in CSS styling, animations, and responsive designs using Flexbox & Grid. Also working knowledge of Tailwind CSS as shown on this portfolio.",
    "JavaScript": "2+ years of professional experience developing interactive web applications with JavaScript, mainly using Vanilla JS in conjunction with PHP sites and APIs, but also working knowledge of more modern frameworks like React.",
    "jQuery": "Experience using jQuery for DOM manipulation and event handling.",
    "PHP": "2+ years of professional experience working with PHP for backend development, server management, and API integrations.",
    "Linux": "2+ years of professional experience working with Linux servers, including setup, maintenance, and administraion. Worked on migating versions of Suse Linux on to new servers and much more.",
    "SQL": "2+ years of professional experience using SQL with PHP applications to handle staff data. Proficient in designing, querying, and optimizing relational databases.",
    "Python": "Personal experience developing scripts and automation tools for my own projects.",
    "Git": "Version control experience with Git and GitHub for collaborative development.",
    "Decade": "Decade of experience in customer service, including retail, food service, and technical support roles.",
    "Communication": "Years of experience interacting with clients, team members, and general public to ensure smooth project delivery.",
    "Clarity": "Strong ability to convey technical concepts in an easy-to-understand manner.",
    "Patience": "Experience in customer-facing roles requiring patience, problem-solving, and effective communication."
};

// Flip Card Function - Triggered by clicking the header only
function flipCard(event) {
    const card = event.currentTarget.closest('.skill-card'); // Find the closest skill card
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');

    // Toggle visibility of front and back
    front.classList.toggle('hidden');
    back.classList.toggle('hidden');
}

// Handle Skill Click - Show Experience Box Only (NO flipping)
document.querySelectorAll('.skill-btn').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        event.stopPropagation(); // Stop event bubbling so the card doesn't flip

        const skill = this.getAttribute('data-skill');
        const description = skillDescriptions[skill] || "No description available.";

        document.getElementById('skill-title').textContent = skill;
        document.getElementById('skill-description').textContent = description;

        // Show experience box
        document.getElementById('experience-box').classList.remove('hidden');
    });
});

// Close Experience Box
function closeExperienceBox() {
    document.getElementById('experience-box').classList.add('hidden');
}

// Attach event listener only to card headers for flipping
document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', flipCard);
});
