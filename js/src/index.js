import navigation from './navigation'
import wpcf7Popup from './wpcf7-popup'
import onAnyElementClick from './on-any-element-click'
import setScrollRatio from './set-scroll-ratio'
import slowScrollToTarget from './slow-scroll-to-target'

window.addEventListener('resize', setScrollRatio)
document.addEventListener('click', onAnyElementClick)
document.addEventListener('click', wpcf7Popup)
document.addEventListener('DOMContentLoaded', navigation)
document.addEventListener('DOMContentLoaded', setScrollRatio)
document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 0) {
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('resize'))
    }
    const scrollTarget = new URLSearchParams(document.location.search).get('scroll_to')
    if (scrollTarget) {
        slowScrollToTarget('#'+scrollTarget)
    }
    if (document.querySelector('.ananas-cols')) {
        setTimeout(() => {
            document.querySelectorAll('.ananas-cols > *').forEach(col => col.classList.add('ready'))
        }, 100)
    }
})
