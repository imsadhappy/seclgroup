/**
 * Services animation on scroll
 * TODO: maybe make for multiple
 */
((id, o) => {

    let scrollSkip = false

    o.minmax = () => {
        o.min = 0
        o.max = 0
        let e = o.container
        if (e && e.offsetParent) {
            do {
                o.min += e.offsetTop;
                e = e.offsetParent;
            } while (e)
        }
        o.max = o.min + o.container.clientHeight
        o.animate()
    }

    o.animate = (skip) => {
        skip = skip || false
        o.images.forEach(img => {
            img.classList.remove('is-selected')
            if (!img.parentNode.classList.contains('active')) { return } // when in tabs
            if (skip) { return }
            let y = img.getBoundingClientRect().y
            let y2 = window.innerHeight
            if (y > y2*.25 && y < y2*.75) {
                img.classList.add('is-selected')
                skip = true
            }
        })
    }

    let t;
    window.addEventListener('resize', ({detail}) => {
        if (detail || !o.container) return
        clearTimeout(t)
        t = setTimeout(() => o.minmax(), 100)
    })

    let t2;
    window.addEventListener('scroll', () => {
        if (scrollSkip) {
            clearTimeout(t2)
            return
        }
        let cur = window.scrollY + window.innerHeight
        if ((cur > o.min && cur < o.max + window.innerHeight)
            || (cur > o.min && cur < o.max) ) {
            clearTimeout(t2)
            t2 = setTimeout(() => o.animate(), 100)
        }
    })

    o.container = document.getElementById(id)

    if (o.container) {
        o.images = o.container.querySelectorAll('.hover-image')
        o.images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                scrollSkip = true
                o.animate(true)
            }, {passive: true})
            img.addEventListener('mouseleave', () => {
                scrollSkip = false
                o.animate(true)
            }, {passive: true})
            img.addEventListener('touchstart', () => {
                scrollSkip = true
                o.animate(true)
            }, {passive: true})
            img.addEventListener('touchend', () => {
                scrollSkip = false
                o.animate(true)
            }, {passive: true})
        })
        o.minmax()
    }

})('services', {min: 0, max: 0});
