(Loader => {

const loadComponent = (fileName) => {
    Loader.load(`${Loader.themeURL}/js/components/${fileName}.js`)
}

//loadComponent('main')
loadComponent('wpcf7-popup')

/**
 * Dotdotdot
 */
if (document.querySelectorAll('.dotdotdot').length > 0) {
    loadComponent('dotdotdot')
}

/**
 * JS Content Injectors (used in blog)
 */
if (document.querySelectorAll('.js-inject-content > *').length > 0 &&
    document.querySelector('.js-inject-container')) {
        loadComponent('content-injector')
    }

/**
 * Autoscrollers
 */
if (document.querySelectorAll('.autoscrolled').length > 0
    || document.querySelectorAll('.autoscrolled-infinite').length > 0) {
        loadComponent('autoscrollers')
    }

/**
 * Hoverscrollers
 */
if ( !('ontouchstart' in window)
        && !(navigator.maxTouchPoints)
        && !(navigator.msMaxTouchPoints)
        && (document.querySelectorAll('.hoverscrolled').length > 0
            || document.querySelectorAll('.hoverscrolled-alt').length > 0 ) ) {
        loadComponent('hoverscrollers')
    }

if (document.querySelectorAll('.technology-pill-container').length > 0) {
    loadComponent('technology-pills')
}

/**
 * Custom Tabs
 */
if (document.querySelectorAll('.custom-tabs-container').length > 0) {
    loadComponent('custom-tabs')
}

/**
 * Simple Accordeon
 */
if (document.querySelectorAll('.accordeon').length > 0) {
    loadComponent('simple-accordeon')
}

/**
 * Map Swiper
 */
if (document.querySelectorAll('.map-swiper').length > 0) {
    loadComponent('map-swiper')
}

/**
 * SVG Bubbles animation
 */
if (document.querySelectorAll('.circle-expand-animation').length > 0) {
    loadComponent('svg-bubbles')
}

/**
 * Services animation on scroll
 */
if (document.querySelectorAll('.animated-services').length > 0) {
    loadComponent('services-animation')
}

/**
 * Industries full-page height (NOT USED)
 */

/**
 * Word Switcher
 */
if (document.querySelectorAll('.js-switch').length > 0) {
    loadComponent('word-switcher')
}

})(window.ComponentLoader)
