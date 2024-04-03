/**
 * Employees
 */
((W, animationDelay, deactivateOne) => {

    if (W.adminpage) return

    document.querySelectorAll('.employees').forEach(container => {

        let offset = 0,
            isMobile = false,
            isTouch = false,
            animatedPart = 1,
            animation, hoverTimeout, touchTimeout, resizeTimeout;

        function allChildren(callback) {
            container.querySelectorAll(':scope > *').forEach(callback)
        }

        function updateBubble(target) {
            let bubble = target?.querySelector('.bubble')
            if (!bubble) return
            bubble.classList.remove('left')
            let rect = bubble.getBoundingClientRect()
            if (rect.x < 0) { //too much left
                bubble.classList.add('left')
                return
            }
            if ((rect.x + rect.width) > W.innerWidth) { //too much right
                return
            }
            if ((rect.x + rect.width) > W.innerWidth / 2) {
                bubble.classList.add('left')
            }
            rect = bubble.getBoundingClientRect()
            if (rect.x + rect.width > W.innerWidth) {
                bubble.classList.remove('left')
            }
        }

        function activateOne(target) {
            allChildren(deactivateOne)
            updateBubble(target)
            target.classList.add('active')
        }

        function matchingChilren() {
            let before = [],
                after = [];
            allChildren(node => {
                let rect = node.getBoundingClientRect()
                let w = rect.x + rect.width
                if (w < W.innerWidth / 2 - 100 && rect.x > 100) before.push(node)
                if (rect.x > W.innerWidth / 2 + 100 && w + 300 < W.innerWidth) after.push(node)
            })
            return {before, after}
        }

        function animateOne() {
            if (isMobile) {
                activateOne(container.firstElementChild)
            } else {
                let {before, after} = matchingChilren(),
                    tooSmall = W.innerWidth / 4 < 400,
                    matching;
                if (animatedPart == 1) {
                    matching = before[Math.ceil(before.length / 2)]
                } else if (animatedPart == 2) {
                    matching = after[Math.floor(after.length / 2)]
                } else {
                    return
                }
                activateOne(tooSmall || !matching ? container.firstElementChild : matching)
            }
        }

        function animate() {
            if (animatedPart === 3) {
                container.appendChild(container.firstElementChild)
                animatedPart = 1
            }
            animateOne()
            animatedPart += isMobile ? 2 : 1 //always 1 on mobile
        }

        function runAnimation(){
            clearInterval(animation)
            animatedPart = 1
            animate()
            animation = setInterval(animate, animationDelay)
        }

        function fillVoid() {
            let n = -1
            while (container.scrollWidth < W.innerWidth) {
                let clone = container.children[++n].cloneNode(true)
                clone.classList.remove('ready')
                container.appendChild(clone)
            }
        }

        function updatePadding(target) {
            let h = target.querySelector('.bubble')?.getBoundingClientRect().height ?? 0
            if (h > offset) offset = h + 80
            if (W.innerWidth > 1080) offset = 0
            container.style.paddingTop = `${offset}px`
        }

        function attachEventListeners(target) {
            if (target.classList.contains('ready')) return
            target.addEventListener('click', () => {
                clearTimeout(touchTimeout)
                clearInterval(animation)
                if (isTouch) {
                    while (target != container.firstElementChild) {
                        container.appendChild(container.firstElementChild)
                    }
                    activateOne(container.firstElementChild)
                    touchTimeout = setTimeout(() => {
                        allChildren(deactivateOne)
                        runAnimation()
                    }, animationDelay)
                } else {
                    activateOne(target)
                }
            })
            target.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout)
                clearInterval(animation)
                activateOne(target)
            })
            target.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout)
                hoverTimeout = setTimeout(() => {
                    allChildren(deactivateOne)
                    runAnimation()
                }, 100)
            })
            target.classList.add('ready')
        }

        W.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                isMobile = W.innerWidth < 500
                isTouch = ('ontouchstart' in W) ||
                          (navigator.maxTouchPoints > 0) ||
                          (navigator.msMaxTouchPoints > 0)
                fillVoid()
                allChildren(deactivateOne)
                allChildren(updatePadding)
                allChildren(attachEventListeners)
                runAnimation()
            }, 100)
        })
    })

    W.dispatchEvent(new Event('resize'))

})(
    window,
    4000,
    (node) => {
        node.classList.remove('active')
        node.blur()
    }
)
