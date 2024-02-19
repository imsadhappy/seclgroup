/**
 * File case-studies.js.
 *
 * Scripts for case studies ACF block
 */
function goToCaseStudy(caseStudy){
    if (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) {
        var clicked = parseInt(caseStudy.dataset.clicked, 10)
        if (!clicked) {
            var siblings = caseStudy.parentElement.children;
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].dataset.clicked = 0
            }
            caseStudy.dataset.clicked = 1
        } else {
            window.location = caseStudy.dataset.url
        }
    } else {
        window.location = caseStudy.dataset.url
    }
}

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
