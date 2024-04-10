
/**
 * File pre-scripts.js.
 */

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get() {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

const setScrollRatio = () => {
    /**
     * Scroll ratio for zoomed screens
     */
    let i = Math.ceil(window.devicePixelRatio)
    if (window.devicePixelRatio < 1) i = 2
    if (window.devicePixelRatio <= .5) i = 3
    if (window.devicePixelRatio <= .25) i = 4
    window.scrollRatio = i
}

const slowScrollToTarget = q => {
    /**
     * Slow scrollTo #anchor
     */
    try {
        const target = document.querySelector(q)
        const masthead = document.getElementById('masthead')
        if (!target) return
        let y = target.getBoundingClientRect().top + window.scrollY
        if (masthead) y -= masthead.clientHeight
        window.scroll({
            top: y,
            behavior: 'smooth'
        })
    } catch (e) {
        console.error(e)
    }
}

const goToProject = project => {
    if (window.adminpage) return
    if (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) {
        var clicked = parseInt(project.dataset.clicked, 10)
        if (!clicked) {
            var siblings = project.parentElement.children;
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].dataset.clicked = 0
            }
            project.dataset.clicked = 1
        } else {
            window.location = project.dataset.url
        }
    } else {
        window.location = project.dataset.url
    }
}

const onAnyElementClick = click => {
    let url = null
    if (click.target.href) {
        url = new URL(click.target.href)
    } else if (click.target.parentElement?.href) {
        url = new URL(click.target.parentElement.href)
    }
    if (!url) return
    if (url.href.endsWith('#')) {
        click.preventDefault()
        return
    }
    if (url.hash != ''
        && url.pathname === location.pathname
        && url.hostname === location.hostname) {
            click.preventDefault()
            slowScrollToTarget(url.hash)
    }
}
