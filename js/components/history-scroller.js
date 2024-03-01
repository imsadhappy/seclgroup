/**
 * History Scroller
 *
//if (('ontouchstart' in W) ||
    //(navigator.maxTouchPoints > 0) ||
    //(navigator.msMaxTouchPoints > 0)) return
 */
((W, x, P) => {
    if (W.adminpage) return
    document.querySelectorAll(`.${x}-container`).forEach(container => {
        const target = container.querySelector(`.${x}`),
              masthead = document.getElementById('masthead'),
              before = container.querySelector(`.${x}-before`),
              after = container.querySelector(`.${x}-after`)
        if (!target) return
        const setHeight = () => {
            target.style.marginTop = 0; before.style.height = 0; after.style.height = '';
            P.height = W.innerHeight - container.clientHeight
            before.style.height = `${P.height * .33}px`
            after.style.height = `${P.height * .33}px`
            target.style.marginTop = `${P.height * .33}px`
            container.style.height = `${target.scrollWidth + (W.innerHeight > W.innerWidth ? P.height : 0)}px`
        }
        P.scrollY = W.scrollY
        const scrollBy = () => {
            let rect = container.getBoundingClientRect(),
                min = W.scrollY + rect.top - 50,
                max = min + container.clientHeight - W.innerHeight
            if (W.scrollY > P.scrollY) { //scrollDown
                if (W.scrollY >= min && rect.bottom - W.innerHeight > 0) {
                    target.scrollLeft += (W.scrollY - P.scrollY)
                }
            } else { //scrollUp
                if (W.scrollY <= max && rect.top-130 < 0) {
                    target.scrollLeft += (-1 * (P.scrollY - W.scrollY))
                }
            }
            P.scrollY = W.scrollY
        }
        target.scrollLeft = 0
        setHeight()
        //W.addEventListener('resize', setHeight, false)
        W.addEventListener('scroll', scrollBy, false)
        W.onbeforeunload = () => W.scrollTo(0, 0)
    })
})(window, 'history-scroller', {})
