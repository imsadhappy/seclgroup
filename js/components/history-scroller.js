/**
 * History Scroller
 */
((w, x) => {
    if (('ontouchstart' in w) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) return
    document.querySelectorAll(`.${x}-container`).forEach(container => {
        const target = container.querySelector(`.${x}`)
        if (!target) return
        let previousScrollY = w.scrollY
        const setPadding = (y) => {
            target.scrollLeft += w.scrollRatio*y
            let bottom = target.scrollWidth - target.clientWidth - target.scrollLeft
            container.style.paddingTop = `${target.scrollLeft}px`
            container.style.paddingBottom = `${bottom}px`
        }
        setPadding(0)
        w.addEventListener('scroll', () => {
            let min = w.scrollY + container.getBoundingClientRect().top - 50
            let max = min + container.clientHeight - w.innerHeight
            if (w.scrollY > previousScrollY && w.scrollY >= min) {
                setPadding(w.scrollY - previousScrollY)
            } else if (w.scrollY < previousScrollY && w.scrollY <= max) {
                setPadding(-1 * (previousScrollY - w.scrollY))
            }
            previousScrollY = w.scrollY
        })
    })
})(window, 'history-scroller')
