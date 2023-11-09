/**
 * Scroll on all element hover
 */
document.querySelectorAll('.hoverscrolled').forEach(container => {
    var x = null;
    container.addEventListener('mouseenter', () => {
        if (container.scrollWidth === container.clientWidth) return;
        x = setInterval(() => {
            var before = container.scrollLeft;
            container.scrollLeft += (container.classList.contains('reverse') ? -1 : 1) * window.scrollRatio;
            var after = container.scrollLeft;
            if (after === before) {
                container.classList.toggle('reverse');
            }
        }, 12);
    });
    container.addEventListener('mouseleave', () => clearInterval(x));
});

/**
 * Scroll on left/right part hover
 */
document.querySelectorAll('.hoverscrolled-alt').forEach(container => {
    var x = null,
        y = null,
        z = null,
        leftBoundary = window.innerWidth * .25,
        rightBoundary = window.innerWidth * .75,
        maxScrollLength = container.scrollWidth;
    window.addEventListener('resize', () => {
        maxScrollLength = container.scrollWidth
        leftBoundary = window.innerWidth * .25
        rightBoundary = window.innerWidth * .75
    });
    function clearAll() {
        clearInterval(x)
        y = null
        z = null
    }
    function onMouseOver(event) {
        if (container.scrollWidth === container.clientWidth) {
            clearAll()
            return
        }
        if (event.clientX <= leftBoundary) {
            y = true
        } else if (event.clientX >= rightBoundary) {
            y = false
        } else {
            clearAll()
            return
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
                    if ((container.scrollLeft+container.clientWidth) < maxScrollLength) {
                        container.scrollLeft += window.scrollRatio;
                    } else {
                        clearInterval(x)
                    }
                }
            }, window.scrollRatio*12);
        }
    }
    container.addEventListener('mouseenter', event => {
        clearAll()
        onMouseOver(event)
    });
    container.addEventListener('mouseover', onMouseOver);
    container.addEventListener('mouseleave', clearAll);
    window.addEventListener('resize', clearAll);
});
