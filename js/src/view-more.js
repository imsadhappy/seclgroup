/**
 * View More toggler
 */
export default () => {
    document.querySelectorAll('.has-view-more').forEach(container => {
        const toggled = container.querySelectorAll('.toggled'),
                togglers = container.querySelectorAll('.toggler')
        if (toggled.length === 0 || togglers.length === 0) return
        togglers.forEach(toggler => {
            toggler.addEventListener('click', click => {
                container.classList.toggle('active')
                toggled.forEach(e => e.classList.toggle('active'))
            })
        })
    })
}
