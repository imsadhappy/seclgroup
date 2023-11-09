/**
 * Services animation on scroll
 * TODO: maybe make for multiple
 */
((w, d, id, o) => {

  //if (('ontouchstart' in window) ||
     //(navigator.maxTouchPoints > 0) ||
     //(navigator.msMaxTouchPoints > 0)) {

    o.minmax = () => {
        o.min = 0
        o.max = 0
        let e = o.container
        if (e && e.offsetParent) {
            do {
                o.min += e.offsetTop;
                e = e.offsetParent;
            } while (e);
        }
        o.max = o.min + o.container.clientHeight
        o.animate()
    }

    o.animate = () => {
        let skip = false
        o.container.querySelectorAll('.hover-image').forEach(e => {
            e.classList.remove('is-selected')
            if (!e.parentNode.classList.contains('active')) { return } // when in tabs
            if (skip) { return }
            let y = e.getBoundingClientRect().y
            let y2 = window.innerHeight
            if (y > y2*.25 && y < y2*.75) {
                e.classList.add('is-selected')
                skip = true
            }
        })
    }

    let t;
    w.addEventListener('resize', ({detail}) => {
        if (detail || !o.container) return
        clearTimeout(t)
        t = setTimeout(() => o.minmax(), 100)
    })

    let t2;
    w.addEventListener('scroll', () => {
        let cur = w.scrollY + w.innerHeight
        if ((cur > o.min && cur < o.max + w.innerHeight)
            || (cur > o.min && cur < o.max) ) {
            clearTimeout(t2)
            t2 = setTimeout(() => o.animate(), 100)
        }
    })

    o.container = document.getElementById(id)
    if (o.container) o.minmax()

    //}
})(window, document, 'services', {min: 0, max: 0});
