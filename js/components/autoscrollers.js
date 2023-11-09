/**
 * Autoscroll, pause on hover
 */
document.querySelectorAll('.autoscrolled').forEach(e => {
    if (e.scrollWidth === e.clientWidth) return
    let it = 22
    function autoScroll(){
        let before = e.scrollLeft
        e.scrollLeft += (e.classList.contains('reverse') ? -1 : 1) * window.scrollRatio
        let after = e.scrollLeft
        if (after === before) e.classList.toggle('reverse')
    }
    let i = setInterval(autoScroll, it)
    if (e.classList.contains('hoverstop')) {
        e.addEventListener('mouseenter', () => clearInterval(i))
        e.addEventListener('mouseleave', () => i = setInterval(autoScroll, it))
    }
})

/**
 * Autoscroll infinite left, pause on hover
 */
document.querySelectorAll('.autoscrolled-infinite').forEach(e => {
    let n = -1,
        it = 22,
        sw = e.scrollWidth,
        cw = e.clientWidth,
        top = e.getBoundingClientRect().top,
        items = e.children,
        wiw = window.innerWidth
    while (items.length < 2) {
        items = items[0].children
        if (!items) break
    }
    function autoScroll(){
        if (sw === cw || top < 0) return
        e.scrollLeft += window.scrollRatio
        if (sw-20 <= e.scrollLeft + cw && items && items.length > 2) {
            items[0].parentNode.appendChild(items[++n].cloneNode(true))
            sw = e.scrollWidth
        }
    }
    let i = setInterval(autoScroll, window.scrollRatio*it)
    if (e.classList.contains('hoverstop')) {
        e.addEventListener('mouseenter', () => clearInterval(i))
        e.addEventListener('mouseleave', () => i = setInterval(autoScroll, window.scrollRatio*it))
    }
    let t
    window.addEventListener('resize', () => {
        if (wiw === window.innerWidth) return
        clearTimeout(t)
        t = setTimeout(() => {
            wiw = window.innerWidth
            sw = e.scrollWidth
            cw = e.clientWidth
            clearInterval(i)
            i = setInterval(autoScroll, window.scrollRatio*it)
        }, 300)
    })
    window.addEventListener('scroll', () => top = e.getBoundingClientRect().top)
})
