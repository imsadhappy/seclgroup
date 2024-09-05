/** Version 1.0.3 */

import navigation from './navigation'
import wpcf7Popup from './wpcf7-popup'
import onAnyElementClick from './on-any-element-click'
import setScrollRatio from './set-scroll-ratio'
import slowScrollToTarget from './slow-scroll-to-target'
import negativeSpacers from './negative-spacer'

window.addEventListener('resize', setScrollRatio)
document.addEventListener('click', onAnyElementClick)
document.addEventListener('click', wpcf7Popup)
document.addEventListener('DOMContentLoaded', navigation)
document.addEventListener('DOMContentLoaded', negativeSpacers)
document.addEventListener('DOMContentLoaded', setScrollRatio)
document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 0) {
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('resize'))
    }
    if (window.location.hash) {
        scroll(0,0)
        setTimeout(()=>{
            scroll(0,0)
            slowScrollToTarget(window.location.hash)
        },1)
    }
    if (document.querySelector('.ananas-cols')) {
        setTimeout(() => {
            document.querySelectorAll('.ananas-cols > *').forEach(col => col.classList.add('ready'))
        }, 100)
    }
    if (document.querySelector('.new-faq')) {
        document.querySelectorAll('.new-faq').forEach(faq =>
            faq.addEventListener('click', _ => faq.classList.toggle('active')))
    }
    /* Work Process quick fix */
    const workProcessH4XPathResult = document.evaluate("//h4[contains(., 'Work Process')]", document, null, XPathResult.ANY_TYPE, null)
    const workProcessH4 = workProcessH4XPathResult.iterateNext()
    if (workProcessH4) workProcessH4.classList.add('work-process-h4')
    document.fonts.ready.then(() => document.body.classList.add('fonts-ready'))
})
