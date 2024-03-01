/**
 * File scripts.js.
 */

function jumpTo(q){
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

/**
 * Scroll ratio for zoomed screens
 */
function setScrollRatio(){
    let sr = Math.ceil(window.devicePixelRatio)
    if (window.devicePixelRatio <= .5) sr = 3
    if (window.devicePixelRatio <= .25) sr = 4
    window.scrollRatio = sr
}
setScrollRatio()
window.addEventListener('resize', setScrollRatio)

document.addEventListener('DOMContentLoaded', () => {

    const scrollTarget = new URLSearchParams(document.location.search).get('scroll_to')

    if (scrollTarget) {
        jumpTo('#'+scrollTarget)
    }

    /**
     * Link href # => javascript:void(0)
     */
    document.querySelectorAll('a[href="#"]').forEach(a => {
        a.setAttribute('href', 'javascript:void(0)');
    })

    /**
     * View More toggler
     */
    document.querySelectorAll('.has-view-more').forEach(container => {
        const toggled = container.querySelectorAll('.toggled'),
                togglers = container.querySelectorAll('.toggler')
        if (toggled.length === 0 || togglers.length === 0) return
        togglers.forEach(toggler => {
            toggler.addEventListener('click', () => {
                container.classList.toggle('active')
                toggled.forEach(e => e.classList.toggle('active'))
            })
        })
    })

    /**
     * Negative Spacer Block
     */
    document.querySelectorAll('.wp-block-spacer.negative').forEach(spacer => {
        var s = window.getComputedStyle(spacer, null)
            h = parseInt(s.height, 10) * 2;
        spacer.style.marginTop = `-${h}px`;
    })

    /**
     * Dispatch hover to children
     */
    document.querySelectorAll('.dispatch-hover').forEach(container => {
        let targets = container.querySelectorAll('.receive-hover')
        container.addEventListener('mouseenter', () => {
            targets.forEach(child => child.classList.add('is-hovered'))
        })
        container.addEventListener('mouseleave', () => {
            targets.forEach(child => child.classList.remove('is-hovered'))
        })
    })

    /**
     * Dispatch click to children
     */
    document.querySelectorAll('.click-child').forEach(container => {
        container.addEventListener('click', () => {
            container.querySelector('a, input')?.click()
        })
    })
})

/**
 * Slow jumpTo #anchor
 */
document.addEventListener('click', event => {
    let url = null
    if (event.target.href) {
        url = new URL(event.target.href)
    } else if (event.target.parentElement?.href) {
        url = new URL(event.target.parentElement.href)
    }
    if (url &&
        url.pathname === location.pathname &&
        url.hostname === location.hostname &&
        url.hash != '') {
            event.preventDefault()
            jumpTo(url.hash)
        }
})

/*
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get() {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('suspend', () => {
            if (!video.playing) video.play()
        });
        window.addEventListener('scroll', () => {
            if (!video.playing) video.play()
        })
    })
})
*/
