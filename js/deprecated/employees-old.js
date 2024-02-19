/**
 * Employees
 */
(() => {

    if (window.adminpage) return

    document.querySelectorAll('.employees').forEach(container => {

        let i = 0, p = 0;
        let t1, t2, animation;

        function clear() {
            clearTimeout(t1)
            clearTimeout(t2)
            clearInterval(animation)
        }

        function next() {
            i++
            if (!container.children[i]) i = 0
            activate(container.children[i])
        }

        function animate(n) {
            i = n
            clearInterval(animation)
            next()
            animation = setInterval(next, 3000)
        }

        function activate(target) {
            container.querySelectorAll('.active').forEach(node => node.classList.remove('active'))
            let rect = target.getBoundingClientRect()
            showBubble(target)
            target.classList.add('active')
            if (i == 0) {
                container.style.transform = `translateX(0)`
                container.dataset.transaltedBy = 0
            }
            if ((rect.x + rect.width) > window.innerWidth) {
                let y = Math.abs(window.innerWidth - rect.x) + parseInt(container.dataset.transaltedBy ?? 0, 10) + target.clientWidth
                container.style.transform = `translateX(-${y}px)`
                container.dataset.transaltedBy = y
            }
        }

        function showBubble(target) {
            let bubble = target.querySelector('.bubble')
            if (!bubble) return
            bubble.classList.remove('left')
            let rect = bubble.getBoundingClientRect()
            if (rect.x < 0) {
                bubble.classList.add('left')
            }
        }

        function init() {
            let n = 0
            while (container.scrollWidth < window.innerWidth) {
                let clone = container.children[++n].cloneNode(true)
                clone.classList.remove('ready')
                container.appendChild(clone)
            }
            container.querySelectorAll(':scope > *').forEach((child, n) => {
                if (!child.classList.contains('ready')) {
                    child.addEventListener('click', () => {
                        clear()
                        activate(child)
                    })
                    child.addEventListener('mouseenter', () => {
                        clear()
                        activate(child)
                    })
                    child.addEventListener('mouseleave', () => {
                        clear()
                        t1 = setTimeout(() => animate(n--), 500)
                    })
                    child.classList.add('ready')
                }
                updatePadding(child)
            })
        }

        function updatePadding(child) {
            let bubble = child.querySelector('.bubble')
            let h = bubble?.getBoundingClientRect().height
            if (h > p) p = h
            if (window.innerWidth > 1080) p = 0
            container.style.paddingTop = `${p}px`
        }

        window.addEventListener('resize', () => {
            clear()
            t2 = setTimeout(() => {
                init()
                animate(-1)
            }, 100)
        })
    })

    window.dispatchEvent(new Event('resize'))
})()
