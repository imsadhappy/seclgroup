/**
 * Technology Pills animation on scroll
 */
(targets => {
    if (targets.length < 1) return;
    targets.forEach(target => {
        ((container) => {
            let t;
            window.addEventListener('scroll', () => {
                clearTimeout(t)
                t = setTimeout(() => {
                    let cl = 'remove',
                        rect = container.getBoundingClientRect(),
                        y1 = window.innerHeight * .20,
                        y2 = window.innerHeight * .60 + rect.height,
                        y = rect.y
                    if (y > y1 && y < y2) { cl = 'add' }
                    container.classList[cl]('no-grayscale')
                }, 100)
            })
        })(target)
    })
})(document.querySelectorAll('.technology-pill-container'))
