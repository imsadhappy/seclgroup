/**
 * SVG Bubbles animation
 */
((w, d, q, o) => {
    o.get = (active) => {
        return d.querySelectorAll((active ? '.active ' : '') + q)
    }
    o.minmax = () => {
        o.min = 0
        o.max = 0
        const items = o.get(true)
        if (items.length > 0) {
            let e = items.item(0).parentNode/* svg */.parentNode
            if (e.offsetParent) {
                do {
                    o.min += e.offsetTop;
                    e = e.offsetParent;
                } while (e);
            }
            o.max = o.min + items.item(0).parentNode.clientHeight
        }
    }
    o.show = (items, force) => {
        if (items.length === 0) return false;
        const parent = items.item(0).parentNode
        const rect = parent.getBoundingClientRect()
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
            o.show(o.get(true), true)
            o.ready = true;
        }
    })

    w.addEventListener('tabChanged', () => {
        o.get().forEach(item => item.classList.remove('active'))
        o.show(o.get(true))
    })

    if (o.get().length > 0) {
        o.minmax()
    }

})(window, document, '.circle-expand-animation', {min: 0, max: 0, ready: false});
