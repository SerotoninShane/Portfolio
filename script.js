    // Show loader on initial page load
    document.addEventListener('DOMContentLoaded', function() {
        const loaderOverlay = document.querySelector('.loader-overlay');
        
        // Show loader initially
        loaderOverlay.classList.add('active');
        
        // Hide loader after 250ms (1/4 second)
        setTimeout(function() {
          loaderOverlay.classList.remove('active');
        }, 400);
        
        // Handle navigation clicks
        const navLinks = document.querySelectorAll('nav a');
        const pages = document.querySelectorAll('.demo-page');
        
        navLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Show loader
            loaderOverlay.classList.add('active');
            
            // After 250ms (1/4 second), change page and hide loader
            setTimeout(function() {
              pages.forEach(page => page.classList.remove('active'));
              document.getElementById(targetPage).classList.add('active');
              loaderOverlay.classList.remove('active');
            }, 400);
          });
        });
        
        // Test button
        document.getElementById('loadBtn').addEventListener('click', function() {
          loaderOverlay.classList.add('active');
          
          setTimeout(function() {
            loaderOverlay.classList.remove('active');
          }, 400);
        });
      });