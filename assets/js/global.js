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
  updateCartCountDisplay();
});
  }

  // Handle index.html click to fade, show image, and then navigate
  const mainHomepage0 = document.getElementById('main-homepage0');
  const homepage1Container = document.getElementById('homepage1-container');

  if (mainHomepage0 && homepage1Container) {
    mainHomepage0.addEventListener('click', function() {
      // 1. Fade out the background
      mainHomepage0.style.transition = 'opacity 1.5s ease-in-out';
      mainHomepage0.style.opacity = '0';

      // 2. After fade out, show the centered image with a fade-in effect
      setTimeout(() => {
        homepage1Container.style.display = 'flex'; // Make it part of the layout
        
        // Use a small timeout to allow the browser to apply the display change
        // before starting the opacity transition.
        setTimeout(() => {
          homepage1Container.classList.add('visible');
        }, 20); 

        // 3. After image is shown, wait 1.5 seconds, then fade out homepage1 and navigate
        setTimeout(() => {
          homepage1Container.style.opacity = '0'; // Start fading out homepage1
          // After homepage1 fades out, navigate
          setTimeout(() => {
            window.location.href = 'homepage2.html';
          }, 1500); // Match the final fade-out duration
        }, 3000); // 3-second delay (1.5s fade-in + 1.5s display)

      }, 1500); // Match the first fade-out duration

    }, { once: true }); // The event will only trigger once
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

  // Fade in on scroll logic
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll, .fade-in-from-left, .fade-in-from-right, .fade-in-from-top');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Staggered fade-in for product cards
  let productCards = document.querySelectorAll('.product-card.fade-in-from-left');
  productCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  // Staggered fade-in for music players
  const musicPlayers = document.querySelectorAll('.music-player.fade-in-from-top');
  musicPlayers.forEach((player, index) => {
    player.style.transitionDelay = `${index * 0.15}s`;
  });

  // Staggered fade-in for member cards
  const memberCards = document.querySelectorAll('.member-card.fade-in-from-left');
  memberCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  // Search bar logic
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('.search-input');

  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      // Clear previous highlights
      const highlighted = document.querySelectorAll('.highlight');
      highlighted.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
      });

      // Find all text nodes
      const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let currentNode;
      let firstMatch = null;
      while (currentNode = treeWalker.nextNode()) {
        const nodeValue = currentNode.nodeValue.toLowerCase();
        if (nodeValue.includes(searchTerm)) {
          const parent = currentNode.parentNode;
          // Avoid highlighting inside script/style tags
          if (parent.tagName.toLowerCase() !== 'script' && parent.tagName.toLowerCase() !== 'style') {
             const newHTML = currentNode.nodeValue.replace(new RegExp(searchTerm, 'gi'), (match) => `<span class="highlight">${match}</span>`);
             const tempDiv = document.createElement('div');
             tempDiv.innerHTML = newHTML;
             
             const fragment = document.createDocumentFragment();
             while(tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
             }
             
             parent.replaceChild(fragment, currentNode);

             if (!firstMatch) {
                firstMatch = parent.querySelector('.highlight');
             }
          }
        }
      }

      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('No results found.');
      }
    }
  }

  if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  // Cart Overlay Logic
  const cartIcon = document.querySelector('.cart-icon');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalSpan = document.getElementById('cartTotal');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  let cartCountSpan = document.querySelector('.cart-count'); // Get the cart count span

  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

 function updateCartCountDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('cartCountSpan:', cartCountSpan);
    console.log('totalItems:', totalItems);
    if (cartCountSpan) {
      cartCountSpan.textContent = totalItems;
      if (totalItems > 0) {
        cartCountSpan.style.display = 'flex'; // Show the count and center the text
      } else {
        cartCountSpan.style.display = 'none'; // Hide if no items
      }
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    const isSubPage = window.location.pathname.includes('/pages/');

    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';
      cart.forEach(item => {
        const imagePath = isSubPage ? `../${item.image}` : item.image;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
          <img src="${imagePath}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button data-id="${item.id}" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button data-id="${item.id}" data-action="increase">+</button>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);

        total += item.price * item.quantity;
      });
    }
    cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    updateCartCountDisplay(); // Update the header cart count
  }

  function addItemToCart(item) {
    console.log('Adding to cart, image source:', item.image); // Debugging line
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    saveCart();
    renderCart();
    // Open cart overlay if not already open
    if (!cartOverlay.classList.contains('active')) {
      cartOverlay.classList.add('active');
    }
  }

  function updateCartItemQuantity(id, action) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === id);
    if (itemIndex > -1) {
      if (action === 'increase') {
        cart[itemIndex].quantity++;
      } else if (action === 'decrease') {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity <= 0) {
          cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        }
      }
      saveCart();
      renderCart();
    }
  }

  function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCountDisplay();
  }

  if (cartIcon && cartOverlay && closeCartBtn) {
    cartIcon.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      cartOverlay.classList.toggle('active');
      renderCart(); // Render cart every time it's opened
    });

    closeCartBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
    });

    // Close cart when clicking outside the sidebar
    cartOverlay.addEventListener('click', (event) => {
      if (event.target === cartOverlay) {
        cartOverlay.classList.remove('active');
      }
    });

    // Event delegation for quantity buttons and remove button
    cartItemsContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        const itemId = target.dataset.id;
        const action = target.dataset.action;
        if (action) {
          updateCartItemQuantity(itemId, action);
        } else if (target.classList.contains('remove-item-btn')) {
          removeItemFromCart(itemId);
        }
      }
    });
  }

  // Add to cart functionality using event delegation
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const card = event.target.closest('.product-card');
      if (card) {
        const id = card.dataset.id;
        const name = card.querySelector('.product-name').textContent.trim();
        const price = parseFloat(card.querySelector('.product-price').textContent.replace('$', ''));
        let imageSrc = card.querySelector('.product-image-link img').getAttribute('src');
        
        // Standardize the image path to be relative to the root, removing any '../'
        if (imageSrc.startsWith('../')) {
          imageSrc = imageSrc.substring(3);
        }
        
        if (id && name && !isNaN(price) && imageSrc) {
          addItemToCart({ id, name, price, image: imageSrc });
        }
      }
    }
  });

  renderCart(); // Initial render of the cart when the page loads

  // Scroll to Top Button Logic
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    // Scroll to top on button click
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll animation
      });
    });
  }
});
