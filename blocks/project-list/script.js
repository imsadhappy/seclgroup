/**
 * File case-studies.js.
 *
 * Scripts for case studies ACF block
 */
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.case-study')
    if (targets.length < 1) return;
    targets.forEach(target => {
        ((container) => {
            let t;
            window.addEventListener('scroll', () => {
                if (window.innerWidth > 480) return
                clearTimeout(t)
                t = setTimeout(() => {
                    let cl = 'remove',
                        rect = container.getBoundingClientRect()
                    if (rect.y > rect.height*-0.9) { cl = 'add' }
                    if (rect.y > window.innerHeight*.60) { cl = 'remove' }
                    container.classList[cl]('highlight')
                }, 100)
            })
        })(target);
    })
})
