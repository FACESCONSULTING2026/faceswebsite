// Hero video loop control
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Set start time to 1:36 (96 seconds)
        const startTime = 96;
        // Set end time to 2:01 (121 seconds)
        const endTime = 121;
        
        // Wait for video to be ready
        heroVideo.addEventListener('loadedmetadata', function() {
            // Set initial time
            heroVideo.currentTime = startTime;
            
            // Play the video
            heroVideo.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
        });
        
        // Loop between start and end time
        heroVideo.addEventListener('timeupdate', function() {
            if (heroVideo.currentTime >= endTime) {
                heroVideo.currentTime = startTime;
            }
        });
        
        // Ensure video loops when it reaches the end
        heroVideo.addEventListener('ended', function() {
            heroVideo.currentTime = startTime;
            heroVideo.play();
        });
        
        // If metadata is already loaded
        if (heroVideo.readyState >= 1) {
            heroVideo.currentTime = startTime;
            heroVideo.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
        }
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Set active nav link based on current page (works with .html and clean URLs)
    const pathPart = window.location.pathname.split('/').filter(Boolean).pop() || '';
    const currentPage = pathPart.replace(/\.html$/i, '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href') || '';
        const linkPage = linkHref.replace(/\.html$/i, '').replace(/^.*\//, '') || 'index';
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

