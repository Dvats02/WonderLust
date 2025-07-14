(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const body = document.body;

// Function to toggle dark mode
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  // Store the user's preference in local storage
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Check if dark mode is enabled in local storage
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
}

// Add event listeners to the toggle buttons
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', toggleDarkMode);
}

if (darkModeToggleMobile) {
  darkModeToggleMobile.addEventListener('click', toggleDarkMode);
}
