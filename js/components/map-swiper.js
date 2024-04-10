((x) => {

    let checkInnerWidth = window.innerWidth
    let t1 = null

    const navigation = (container) => {
        let x2 = `${x}-navigation`
        let next = container.parentElement.querySelector(`.${x2}-next`)
        let prev = container.parentElement.querySelector(`.${x2}-prev`)
        const updateNavigation = () => {
            let h = container.getBoundingClientRect().height / 2
            next.style.transform = `translateY(-${h}px)`;
            prev.style.transform = `translateY(${h}px)`;
            prev.classList[(container.scrollLeft === 0) ? 'add' : 'remove']('disabled')
            next.classList[(container.lastElementChild.classList.contains('active')) ? 'add' : 'remove']('disabled')
        }
        if (!prev) {
            prev = document.createElement('a')
            prev.classList.add(x2, `${x2}-prev`)
            prev.setAttribute('href', '#')
            container.parentElement.insertBefore(prev, container)
            prev.addEventListener('click', () => {
                let target = container.querySelector(':scope > .active').previousElementSibling
                if (target) target.click()
            })
        }
        if (!next) {
            next = document.createElement('a')
            next.classList.add(x2, `${x2}-next`)
            next.setAttribute('href', '#')
            container.parentElement.insertBefore(next, container.nextElementSibling)
            next.addEventListener('click', () => {
                let target = container.querySelector(':scope > .active').nextElementSibling
                if (target) target.click()
            })
        }
        updateNavigation()
        container.addEventListener('animationComplete', updateNavigation)
    }

    const animate = (active, container, instant) => {
        let complete = false
        let y = 5 / window.devicePixelRatio
        let y1 = Math.round(active.getBoundingClientRect().x)
        let y2 = window.innerWidth > 800 ? Math.round((window.innerWidth - 800) / 2) : 0
        if (y1 === y2) {
            complete = true
        } else {
            let r = Math.abs(y2 - y1)
            if (instant) {
                y = r
                complete = true
            }
            if (y1 < y2) {
                container.scrollLeft -= ((y2 - y1) < y) ? y2 - y1 : y
            } else if (y1 > y2) {
                container.scrollLeft += ((y1 - y2) < y) ? y1 - y2 : y
            } else {
                complete = true
            }
        }
        if (complete) {
            clearInterval(t1)
            container.dispatchEvent(new Event('animationComplete'))
        }
    }

    const onscroll = (container) => {
        let t3 = null
        container.addEventListener('scroll', () => {
            clearTimeout(t3)
            t3 = setTimeout(() => {
                let y = container.scrollLeft
                const first = container.firstElementChild
                const last = container.lastElementChild
                if (y < (first.clientWidth / 4)
                    && !first.classList.contains('active')) {
                    first.dispatchEvent(new Event('instantActivate'))
                } else if (y+container.clientWidth === container.scrollWidth
                            && !last.classList.contains('active')) {
                    last.dispatchEvent(new Event('instantActivate'))
                } else {
                    for (let i = 0; i <= container.children.length; i++) {
                        let e = container.children[i]
                        if (e) {
                            let bcr = e.getBoundingClientRect()
                            let c = window.innerWidth / 2
                            if (c > bcr.x && c < (bcr.x + bcr.width)
                                && !e.classList.contains('active')) {
                                e.dispatchEvent(new Event('instantActivate'))
                                break
                            }
                        }
                    }
                }
            }, 333)
        })
    }

    const init = (first) => {
        document.querySelectorAll(`.${x}`).forEach(container => {
            let children = container.children
            let n = children.length
            if (n === 0) return
            navigation(container)
            let active = container.querySelector(':scope > .active')
            if (!active) {
                active = children[Math.round(n / 2)-1]
                if (active) active.classList.add('active')
            }
            animate(active, container, true)
            if (first) {
                onscroll(container)
                for (let i = 0; i <= children.length; i++) {
                    if (children[i]) children[i].addEventListener('instantActivate', activate)
                }
            }
        })
    }

    const swipe = (target, instant) => {
        if (target.classList.contains('active')) return
        const container = target.parentElement
        if (container && container.classList.contains(x)) {
            clearInterval(t1)
            for (let i = 0; i <= container.children.length; i++) {
                container.children[i]?.classList?.remove('active')
            }
            target.classList.add('active')
            t1 = setInterval(() => {
                animate(target, container, instant)
            }, 1)
        }
    }

    const activate = (event) => {
        if (event.target) {
            swipe(event.target, event.type === 'instantActivate')
            let id = event.target.id?.toLowerCase()
            if (id && id.indexOf('-map') > 0) {
                id = id.replace('-map', '')
                let tabs = [...document.querySelectorAll('.custom-tabs > :not(.active)')]
                            .filter(tab => tab.textContent.toLowerCase() === id)
                if (tabs.length > 0) tabs[0].click()
            }
        }
    }

    document.addEventListener('click', activate)

    let t2 = null
    window.addEventListener('resize', () => {
        if (window.innerWidth === checkInnerWidth) return
        checkInnerWidth = window.innerWidth
        clearTimeout(t2)
        t2 = setTimeout(init, 333)
    })

    window.addEventListener('tabChanged', ({detail}) => {
        let id = detail?.tab?.textContent.toLowerCase()+'-map'
        let target = document.getElementById(id)
        if (target) swipe(target)
    })

    init(true)

})('map-swiper')
