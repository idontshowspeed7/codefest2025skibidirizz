let darkmode = localStorage.getItem('darkmode');
const darkModeToggleButton = document.getElementById('mode-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.removeItem('darkmode'); // Remove the item from local storage
};

// Check if dark mode is enabled on initial load
if (darkmode === 'active') {
    enableDarkmode();
}

// Event listener for toggling dark mode
darkModeToggleButton.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode'); // Get current state
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});
