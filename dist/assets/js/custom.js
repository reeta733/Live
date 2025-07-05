(function () {

    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
    });

    // Preloader Function
    var preloader = function() {
        var loader = document.querySelector('.loader');
        var overlay = document.getElementById('overlayer');

        // function fadeOut(el) {
        //     el.style.opacity = 1;
        //     (function fade() {
        //         if ((el.style.opacity -= 0.1) < 0) {
        //             el.style.display = "none";
        //         } else {
        //             requestAnimationFrame(fade);
        //         }
        //     })();
        // }

        setTimeout(function() {
            if (loader) fadeOut(loader);
            if (overlay) fadeOut(overlay);
        }, 200);
    };
    preloader();

    // Tiny Slider Initialization
    var tinySlider = function() {
        if (typeof tns === 'undefined') {
            console.error("Tiny Slider (tns) is not defined. Ensure tiny-slider.js is loaded.");
            return;
        }

        var heroSlider = document.querySelectorAll('.hero-slide');
        var propertySlider = document.querySelectorAll('.property-slider');
        var imgPropertySlider = document.querySelectorAll('.img-property-slide');
        var testimonialSlider = document.querySelectorAll('.testimonial-slider');

        if (heroSlider.length > 0) {
            var tnsHeroSlider = tns({
                container: '.hero-slide',
                mode: 'carousel',
                speed: 700,
                autoplay: true,
                controls: false,
                nav: false,
                autoplayButtonOutput: false,
                controlsContainer: '#hero-nav',
            });
        }

        if (imgPropertySlider.length > 0) {
            var tnsPropertyImageSlider = tns({
                container: '.img-property-slide',
                mode: 'carousel',
                speed: 700,
                items: 1,
                gutter: 30,
                autoplay: true,
                controls: false,
                nav: true,
                autoplayButtonOutput: false
            });
        }

        if (propertySlider.length > 0) {
            var tnsPropertySlider = tns({
                container: '.property-slider',
                mode: 'carousel',
                speed: 700,
                gutter: 30,
                items: 3,
                autoplay: true,
                autoplayButtonOutput: false,
                controlsContainer: '#property-nav',
                responsive: {
                    0: { items: 1 },
                    700: { items: 2 },
                    900: { items: 3 }
                }
            });
        }

        if (testimonialSlider.length > 0) {
            var tnsTestimonialSlider = tns({
                container: '.testimonial-slider',
                mode: 'carousel',
                speed: 700,
                items: 3,
                gutter: 50,
                autoplay: true,
                autoplayButtonOutput: false,
                controlsContainer: '#testimonial-nav',
                responsive: {
                    0: { items: 1 },
                    700: { items: 2 },
                    900: { items: 3 }
                }
            });
        }
    };
    tinySlider();

})();
