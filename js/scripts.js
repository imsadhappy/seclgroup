/**
 * File scripts.js.
 */

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

window.addEventListener('resize', setScrollRatio)

document.addEventListener('DOMContentLoaded', setScrollRatio)

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
    document.querySelectorAll('.has-view-more').forEach(container => {
        const toggled = container.querySelectorAll('.toggled'),
                togglers = container.querySelectorAll('.toggler')
        if (toggled.length === 0 || togglers.length === 0) return
        togglers.forEach(toggler => {
            toggler.addEventListener('click', click => {
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
        container.addEventListener('mouseenter', mouseenter => {
            targets.forEach(child => child.classList.add('is-hovered'))
        })
        container.addEventListener('mouseleave', mouseleave => {
            targets.forEach(child => child.classList.remove('is-hovered'))
        })
    })

    /**
     * Dispatch click to children
     */
    document.querySelectorAll('.click-child').forEach(container => {
        let a = container.querySelector('a, input')
        if (a) {
            container.classList.add('has-a')
            container.addEventListener('click', click => a.click())
        }
    })
})

document.addEventListener('click', event => {
    let url = null
    if (event.target.href) {
        url = new URL(event.target.href)
    } else if (event.target.parentElement?.href) {
        url = new URL(event.target.parentElement.href)
    }
    if (url && url.hash != ''
        && url.pathname === location.pathname
        && url.hostname === location.hostname) {
            event.preventDefault()
            slowScrollToTarget(url.hash)
    }
})

document.addEventListener('click', event => {
    if (event.target.parentElement?.classList.contains('taxonomy-project-category')) {
        event.preventDefault()
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
