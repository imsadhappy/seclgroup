/**
 * SVG Bubbles animation
 */
((w, d, q, o) => {
    o.get = (active) => d.querySelectorAll((active ? '.active ' : '') + q)
    o.minmax = () => {
        o.min = 0
        o.max = 0
        const items = o.get(true)
        const svg = items.item(0).parentNode
        if (items.length > 0) {
            let e = svg.parentNode
            if (e.offsetParent) {
                do {
                    o.min += e.offsetTop;
                    e = e.offsetParent;
                } while (e);
            }
            o.max = o.min + svg.clientHeight
        }
    }
    o.show = (force) => {
        const items = o.get(true)
        if (items.length === 0) return false
        const rect = items.item(0).parentNode.getBoundingClientRect()
        if ((rect.bottom > 0 && rect.bottom < w.innerHeight+rect.height/2) || force){
            let t = 1000 / items.length
            items.forEach((item, i) => {
                t += 100
                setTimeout(() => {
                    item.classList.add('active')
                }, t)
            })
        }
    }

    let t;
    w.addEventListener('resize', ({detail}) => {
        if (detail) return
        clearTimeout(t)
        t = setTimeout(() => o.minmax(), 100)
    })

    w.addEventListener('scroll', () => {
        let cur = w.scrollY + w.innerHeight
        if (o.ready) return
        if ((cur > o.min && cur < o.max + w.innerHeight)
            || (cur > o.min && cur < o.max) ) {
            o.show(true)
            o.ready = true;
        }
    })

    w.addEventListener('tabChanged', ({detail}) => {
        if (o.get(true).item(0).parentNode/* svg */.parentNode != detail?.content) return
        o.get().forEach(item => item.classList.remove('active'))
        o.show()
    })

    if (o.get().length > 0) {
        o.minmax()
    }

})(window, document, '.circle-expand-animation', {min: 0, max: 0, ready: false});
