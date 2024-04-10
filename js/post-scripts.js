
/**
 * File post-scripts.js.
 */

window.addEventListener('resize', setScrollRatio)

document.addEventListener('click', onAnyElementClick)

document.addEventListener('DOMContentLoaded', setScrollRatio)

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

document.addEventListener('DOMContentLoaded', () => {

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

    /**
     * Play & Pause videos
     */
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('suspend', () => {
            if (!video.playing) video.play()
        })
        window.addEventListener('scroll', () => {
            if (!video.playing) video.play()
        })
    })
})
