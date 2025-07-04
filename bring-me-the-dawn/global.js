document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.main-nav .dropdown');
  const dropdownMenu = document.querySelector('.main-nav .dropdown-menu');

  if (dropdown && dropdownMenu) {
    dropdown.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click from propagating to the document
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function(event) {
      if (!dropdown.contains(event.target)) {
        dropdownMenu.style.display = 'none';
      }
    });
  }

  // Handle homepage0.html click to fade out and navigate
  const mainHomepage0 = document.getElementById('main-homepage0');
  if (mainHomepage0) {
    mainHomepage0.addEventListener('click', function() {
      const targetPage = mainHomepage0.dataset.target;
      if (targetPage) {
        mainHomepage0.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = targetPage;
        }, 1500); // Match the duration of the fadeOut animation
      }
    });
  }

  // Handle homepage1.html fade in on load
  const mainHomepage1 = document.getElementById('main-homepage1');
  if (mainHomepage1) {
    mainHomepage1.classList.add('fade-in');
  }
});
