(loadComponent => {

/**
 * Dotdotdot
 *//*
if (document.querySelectorAll('.dotdotdot').length > 0) {
    loadComponent('dotdotdot')
}
*/

if (document.querySelector('.search-form')) {
    loadComponent('search')
}

if (document.querySelectorAll('.js-inject-content > *').length > 0 && document.querySelector('.js-inject-container')) {
    loadComponent('content-injector')
}

if (document.querySelector('.autoscrolled') || document.querySelector('.autoscrolled-infinite')) {
    loadComponent('autoscrollers')
}

if ( !('ontouchstart' in window) &&
     !(navigator.maxTouchPoints) &&
     !(navigator.msMaxTouchPoints) &&
     (document.querySelector('.hoverscrolled') ||
      document.querySelector('.hoverscrolled-alt')) ) {
        loadComponent('hoverscrollers')
    }

if (document.querySelector('.technology-pill-container')) {
    loadComponent('technology-pills')
}

if (document.querySelector('.custom-tabs-container')) {
    loadComponent('custom-tabs')
}

if (document.querySelector('.accordeon')) {
    loadComponent('simple-accordeon')
}

if (document.querySelector('.map-swiper')) {
    loadComponent('map-swiper')
}

if (document.querySelector('.history-scroller')) {
    loadComponent('history-scroller')
}

if (document.querySelector('.circle-expand-animation')) {
    loadComponent('svg-bubbles')
}

if (document.querySelector('.animated-services')) {
    loadComponent('services-animation')
}

if (document.querySelector('.country-address-map')) {
    loadComponent('country-address-map')
}

if (document.querySelector('.employees')) {
    loadComponent('employees')
}

if (document.querySelector('.js-switch')) {
    loadComponent('word-switcher')
}

if (document.querySelector('video')) {
    loadComponent('video-lazyload')
}

if (document.querySelector('.has-view-more')) {
    loadComponent('view-more')
}

if (document.querySelector('.wp-block-spacer.negative')) {
    loadComponent('negative-spacer')
}

if (document.querySelector('.go-to-project')) {
    loadComponent('go-to-project')
}

if (document.querySelector('.dispatch-hover') || document.querySelector('.click-child')) {
    loadComponent('dispatch-to-children')
}

})(fileName => {
    let src = `${window.ComponentLoader.themeURL}/js/components/${fileName}.js?ver=${window.ComponentLoader.themeVer}`
    window.ComponentLoader.load(src)
})
