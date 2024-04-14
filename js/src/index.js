import navigation from './navigation'
import wpcf7Popup from './wpcf7-popup'
import goToProject from './go-to-project'
import onAnyElementClick from './on-any-element-click'
import setScrollRatio from './set-scroll-ratio'
import slowScrollToTarget from './slow-scroll-to-target'
import viewMore from './view-more'
import negativeSpacer from './negative-spacer'
import dispatchToChildren from './dispatch-to-children'
import videoPlayPause from './video-play-pause'

window.addEventListener('resize', setScrollRatio)
document.addEventListener('click', onAnyElementClick)
document.addEventListener('click', wpcf7Popup)
document.addEventListener('DOMContentLoaded', navigation)
document.addEventListener('DOMContentLoaded', setScrollRatio)
document.addEventListener('DOMContentLoaded', viewMore)
document.addEventListener('DOMContentLoaded', negativeSpacer)
document.addEventListener('DOMContentLoaded', dispatchToChildren)
document.addEventListener('DOMContentLoaded', videoPlayPause)
document.addEventListener('DOMContentLoaded', goToProject)

document.addEventListener('click', click => {
    if (click.target.parentElement?.classList.contains('taxonomy-project-category')) {
        click.preventDefault()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const scrollTarget = new URLSearchParams(document.location.search).get('scroll_to')
    if (scrollTarget) {
        slowScrollToTarget('#'+scrollTarget)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 0) {
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('resize'))
    }
})
