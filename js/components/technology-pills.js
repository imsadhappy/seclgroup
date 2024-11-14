/**
 * Technology Pills animation on scroll
 */
(targets => {
    if (targets.length < 1) return;
    const selectActionFor = el => {
        let rect = el.getBoundingClientRect(),
            h = window.innerHeight,
            y1 = h * .20,
            y2 = h * .60 + rect.height,
            y = rect.y
        if (y > h || y < 0-h) return
        return (y > y1 && y < y2) ? 'add' : 'remove'
    }
    targets.forEach(target => 
        (el => {
            let t, action, scheduledAnimationFrame;
            const grayscaleAnimation = () => { 
                el.classList[action]('no-grayscale', 'in-view')
                scheduledAnimationFrame = false
            }
            window.addEventListener('scroll', () => {
                clearTimeout(t)
                t = setTimeout(() => {
                    if (scheduledAnimationFrame) return
                    let selectedAction = selectActionFor(el)
                    if (!selectedAction || selectedAction === action) return
                    action = selectedAction
                    scheduledAnimationFrame = true
                    requestAnimationFrame(grayscaleAnimation)
                }, 100)
            })
        })(target))
})(document.querySelectorAll('.technology-pill-container, .click-child, .hover-color-logos'))
