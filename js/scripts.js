/**
 * File scripts.js.
 */

/**
 * Scroll ratio for zoomed screens
 */
function setScrollRatio() {
    let sr = window.devicePixelRatio >= 1 ? 1 : 2
    if (window.devicePixelRatio <= .5) sr = 3
    if (window.devicePixelRatio <= .25) sr = 4
    window.scrollRatio = sr
}
setScrollRatio()
window.addEventListener('resize', setScrollRatio)

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Link href # => javascript:void(0)
     */
    document.querySelectorAll('a[href="#"]').forEach(a => {
        a.setAttribute('href', 'javascript:void(0)');
    })

    /**
     * View More toggler
     */
    document.querySelectorAll('.has-view-more').forEach(container =>{
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
    document.querySelectorAll('.wp-block-spacer.negative').forEach(spacer =>{
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
})

/**
 * Slow scrollTo #anchor
 */
document.addEventListener('click', event => {
    if (event.target.href) {
        const url = new URL(event.target.href)
        if (url.pathname === location.pathname
            && url.hostname === location.hostname
            && url.hash != '') {
                const target = document.querySelector(url.hash)
                const masthead = document.getElementById('masthead')
                if (!target) return
                event.preventDefault()
                let y = target.getBoundingClientRect().top + window.scrollY
                if (masthead) y -= masthead.clientHeight
                window.scroll({
                    top: y,
                    behavior: 'smooth'
                })
            }
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
