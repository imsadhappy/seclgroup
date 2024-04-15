/**
 * Scroll on all element hover
 */
document.querySelectorAll('.hoverscrolled').forEach(container => {
    let x = null
    container.addEventListener('mouseenter', () => {
        if (container.scrollWidth === container.clientWidth) return
        x = setInterval(() => {
            let before = container.scrollLeft
            container.scrollLeft += (container.classList.contains('reverse') ? -1 : 1) * window.scrollRatio
            let after = container.scrollLeft
            if (after === before) {
                container.classList.toggle('reverse')
            }
        }, 12)
    })
    container.addEventListener('mouseleave', () => clearInterval(x))
})

/**
 * Scroll on left/right part hover
 */
document.querySelectorAll('.hoverscrolled-alt').forEach(container => {
    let x, y, z, leftX, rightX;
    const setBounds = () => {
        leftX = window.innerWidth * .25
        rightX = window.innerWidth * .75
    }
    const clearAll = () => {
        clearInterval(x)
        y = null
        z = null
    }
    const set0 = () => {
        if (container.classList.contains('mobile-not-scrollable') && window.innerWidth <= 480) {
            container.scrollLeft = 0
            return true
        } else {
            return false
        }
    }
    const onMouseOver = event => {
        if (container.scrollWidth === container.clientWidth || set0()) {
            return clearAll()
        }
        if (event.clientX <= leftX) {
            y = true
        } else if (event.clientX >= rightX) {
            y = false
        } else {
            return clearAll()
        }
        if (y != z) {
            clearInterval(x)
            z = y
            x = setInterval(() => {
                if (z) {
                    container.scrollLeft -= window.scrollRatio;
                    if (container.scrollLeft <= 1) {
                        clearInterval(x)
                    }
                } else {
                    if ((container.scrollLeft+container.clientWidth) < container.scrollWidth) {
                        container.scrollLeft += window.scrollRatio;
                    } else {
                        clearInterval(x)
                    }
                }
            }, window.scrollRatio*12)
        }
    }
    setBounds()
    container.addEventListener('mouseenter', event => {
        clearAll()
        onMouseOver(event)
    })
    container.addEventListener('mouseover', onMouseOver)
    container.addEventListener('mouseleave', clearAll)
    window.addEventListener('resize', () => {
        clearAll()
        setBounds()
        set0()
    })
})
