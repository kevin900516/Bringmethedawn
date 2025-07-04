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

  // Handle index.html click to fade out and navigate
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

  // Custom Video Player Logic
  const video = document.getElementById('featuredVideo');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const playIcon = playPauseBtn ? playPauseBtn.querySelector('.play-icon') : null;
  const pauseIcon = playPauseBtn ? playPauseBtn.querySelector('.pause-icon') : null;
  const progressBarContainer = document.querySelector('.video-controls .progress-bar-container');
  const progressBarFg = document.querySelector('.video-controls .progress-bar-fg');
  const currentTimeSpan = document.querySelector('.time-display .current-time');
  const durationSpan = document.querySelector('.time-display .duration');
  const volumeIcon = document.querySelector('.volume-control .volume-icon');
  const volumeSliderContainer = document.querySelector('.volume-control .volume-slider-container');
  const volumeSliderFg = document.querySelector('.volume-control .volume-slider-fg');

  if (video && playPauseBtn && progressBarContainer && progressBarFg && currentTimeSpan && durationSpan && volumeIcon && volumeSliderContainer && volumeSliderFg) {
    // Update time display
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    video.addEventListener('loadedmetadata', () => {
      durationSpan.textContent = formatTime(video.duration);
      volumeSliderFg.style.width = `${video.volume * 100}%`; // Set initial volume slider position
    });

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
      if (video.paused || video.ended) {
        video.play();
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
      } else {
        video.pause();
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    });

    // Update progress bar and time
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBarFg.style.width = `${progress}%`;
      currentTimeSpan.textContent = formatTime(video.currentTime);
    });

    // Seek functionality
    progressBarContainer.addEventListener('click', (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const seekTime = (clickX / width) * video.duration;
      video.currentTime = seekTime;
    });

    // Volume control
    volumeSliderContainer.addEventListener('click', (e) => {
      const rect = volumeSliderContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = clickX / width;
      video.volume = newVolume;
      volumeSliderFg.style.width = `${newVolume * 100}%`;
    });

    // Mute/Unmute on volume icon click
    volumeIcon.addEventListener('click', () => {
      if (video.volume > 0) {
        video.volume = 0;
        volumeSliderFg.style.width = '0%';
        // Optionally change volume icon to mute icon
      } else {
        video.volume = 1; // Restore to full volume or last known volume
        volumeSliderFg.style.width = '100%';
        // Optionally change volume icon to unmute icon
      }
    });

    // Reset video when ended
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });
  }
});
