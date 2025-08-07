// Enhanced Review Slider Script with Auto-slide and Fixed Navigation
$(document).ready(function() {
    // Initialize review slider functionality
    var $slider = $('.ot-review-slider');
    var $slides = $('.ot-review-slides');
    var $mask = $('.ot-review-slider-mask');
    var $leftArrow = $('.ot-review-left-arrow');
    var $rightArrow = $('.ot-review-right-arrow');
    var $dots = $('.w-slider-dot');
    
    if ($slider.length > 0) {
        var currentSlide = 0;
        var totalSlides = $slides.length;
        var autoSlideInterval;
        var isAutoSliding = true;
        
        // Function to go to specific slide with smooth transition
        function goToSlide(index) {
            // Remove active class from all slides and dots
            $slides.removeClass('w-active').attr('aria-hidden', 'true');
            $dots.removeClass('w-active').attr('aria-pressed', 'false');
            
            // Add active class to current slide and dot
            $slides.eq(index).addClass('w-active').attr('aria-hidden', 'false');
            $dots.eq(index).addClass('w-active').attr('aria-pressed', 'true');
            
            currentSlide = index;
            
            // Update aria labels
            $slides.each(function(i) {
                $(this).attr('aria-label', (i + 1) + ' of ' + totalSlides);
            });
            
            // Update slider aria label
            $('.w-slider-aria-label').text('Slide ' + (index + 1) + ' of ' + totalSlides);
        }
        
        // Function to go to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }
        
        // Auto-slide function
        function startAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
            autoSlideInterval = setInterval(function() {
                if (isAutoSliding) {
                    nextSlide();
                }
            }, 3000); // Auto-slide every 3 seconds
        }
        
        // Stop auto-slide function
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
        
        // Arrow click handlers with improved functionality
        $leftArrow.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Temporarily pause auto-slide
            isAutoSliding = false;
            setTimeout(function() {
                isAutoSliding = true;
            }, 5000); // Resume auto-slide after 5 seconds
            
            prevSlide();
            
            // Restart auto-slide
            stopAutoSlide();
            startAutoSlide();
        });
        
        $rightArrow.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Temporarily pause auto-slide
            isAutoSliding = false;
            setTimeout(function() {
                isAutoSliding = true;
            }, 5000); // Resume auto-slide after 5 seconds
            
            nextSlide();
            
            // Restart auto-slide
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Dot navigation
        $dots.on('click', function(e) {
            e.preventDefault();
            var dotIndex = $(this).index();
            
            // Temporarily pause auto-slide
            isAutoSliding = false;
            setTimeout(function() {
                isAutoSliding = true;
            }, 5000);
            
            goToSlide(dotIndex);
            
            // Restart auto-slide
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Pause auto-slide on hover
        $slider.on('mouseenter', function() {
            isAutoSliding = false;
        });
        
        $slider.on('mouseleave', function() {
            isAutoSliding = true;
        });
        
        // Touch/swipe support for mobile
        var touchStartX = 0;
        var touchEndX = 0;
        
        $slider.on('touchstart', function(e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });
        
        $slider.on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            var swipeThreshold = 50;
            var diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                
                // Pause auto-slide temporarily
                isAutoSliding = false;
                setTimeout(function() {
                    isAutoSliding = true;
                }, 5000);
            }
        }
        
        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if ($slider.is(':visible')) {
                if (e.keyCode === 37) { // Left arrow
                    e.preventDefault();
                    $leftArrow.trigger('click');
                } else if (e.keyCode === 39) { // Right arrow
                    e.preventDefault();
                    $rightArrow.trigger('click');
                }
            }
        });
        
        // Initialize slider
        goToSlide(0);
        startAutoSlide();
        
        // Pause auto-slide when tab is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                isAutoSliding = false;
            } else {
                isAutoSliding = true;
            }
        });
    }
    
    // Smooth scroll animations for review section
    function animateOnScroll() {
        $('.ot-review-slider').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }
    
    // Trigger animation on scroll
    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Initial check
}); 