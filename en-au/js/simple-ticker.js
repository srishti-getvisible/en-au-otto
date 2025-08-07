// Simple Ticker Animation Script
$(document).ready(function() {
    console.log('Simple ticker script loaded');
    
    // Initialize ticker animations
    $("[lumious-ticker]").each(function() {
        console.log('Found ticker element:', this);
        var $ticker = $(this);
        var isVertical = $ticker.css("flex-direction").startsWith("column");
        var reverseDirection = $ticker.css("justify-content") === "flex-end";
        var pauseOnHover = $ticker.attr("lumious-ticker-pause") !== "false";
        
        console.log('Ticker settings:', {
            isVertical: isVertical,
            reverseDirection: reverseDirection,
            pauseOnHover: pauseOnHover
        });
        
        // Get speed based on screen size
        function getSpeed() {
            var windowWidth = $(window).width();
            var speed = parseFloat($ticker.attr("lumious-ticker-speed")) || 1;
            console.log('Ticker speed:', speed, 'Window width:', windowWidth);
            if (windowWidth <= 478) {
                return parseFloat($ticker.attr("lumious-ticker-speed-mobile")) || 
                       parseFloat($ticker.attr("lumious-ticker-speed")) || 1;
            } else if (windowWidth <= 767 || windowWidth <= 991) {
                return parseFloat($ticker.attr("lumious-ticker-speed-tablet")) || 
                       parseFloat($ticker.attr("lumious-ticker-speed")) || 1;
            } else {
                return parseFloat($ticker.attr("lumious-ticker-speed")) || 1;
            }
        }
        
        var baseSpeed = getSpeed();
        var currentSpeed = baseSpeed;
        var position = 0;
        var $content = $ticker.find("[lumious-ticker-content]");
        
        console.log('Found ticker content elements:', $content.length);
        
        // Clone content if less than 2 items
        if ($content.length < 2) {
            $content.first().clone().appendTo($ticker);
            $content = $ticker.find("[lumious-ticker-content]");
            console.log('Cloned content, now have:', $content.length, 'elements');
        }
        
        // Animation loop
        function animate() {
            var step = currentSpeed / (isVertical ? $ticker.height() : $ticker.width()) * 100 * (1/60);
            position += reverseDirection ? step : -step;
            
            $content.each(function() {
                var transform = isVertical ? "translateY(" + position + "%)" : "translateX(" + position + "%)";
                $(this).css("transform", transform);
            });
            
            // Reset position when animation completes
            if ((!reverseDirection && position <= -100) || (reverseDirection && position >= 100)) {
                position = 0;
            }
            
            requestAnimationFrame(animate);
        }
        
        console.log('Starting ticker animation');
        // Start animation
        requestAnimationFrame(animate);
        
        // Pause on hover if enabled
        if (pauseOnHover) {
            $ticker.hover(
                function() { 
                    console.log('Ticker paused on hover');
                    currentSpeed = 0; 
                },
                function() { 
                    console.log('Ticker resumed from hover');
                    currentSpeed = baseSpeed; 
                }
            );
        }
        
        // Handle window resize
        $(window).resize(function() {
            baseSpeed = getSpeed();
            currentSpeed = baseSpeed;
        });
    });
    
    console.log('Ticker initialization complete');
}); 