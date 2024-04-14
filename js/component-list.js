(loadComponent => {

/**
 * Dotdotdot
 */
//if (document.querySelectorAll('.dotdotdot').length > 0) {
    //loadComponent('dotdotdot')
//}

/**
 * Search
 */
if (document.querySelectorAll('.search-form').length > 0) {
    loadComponent('search')
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
 * History Scroller
 */
if (document.querySelectorAll('.history-scroller').length > 0) {
    loadComponent('history-scroller')
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
 * Countries address svg map
 */
if (document.querySelectorAll('.country-address-map').length > 0) {
    loadComponent('country-address-map')
}

/**
 * Employees
 */
if (document.querySelectorAll('.employees').length > 0) {
    loadComponent('employees')
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

if (document.querySelectorAll('video.lazy').length > 0) {
    loadComponent('video-lazyload')
}

})(fileName => {
    let src = `${window.ComponentLoader.themeURL}/js/components/${fileName}.js?ver=${window.ComponentLoader.themeVer}`
    window.ComponentLoader.load(src)
})
