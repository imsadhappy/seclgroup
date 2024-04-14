/**
 * Dispatch hover to children
 */
export default () => {

    if (window.adminpage) return

    document.querySelectorAll('.dispatch-hover').forEach(container => {
        let targets = container.querySelectorAll('.receive-hover')
        container.addEventListener('mouseenter', mouseenter => {
            targets.forEach(child => child.classList.add('is-hovered'))
        })
        container.addEventListener('mouseleave', mouseleave => {
            targets.forEach(child => child.classList.remove('is-hovered'))
        })
    })

    /**
     * Dispatch click to children
     */
    document.querySelectorAll('.click-child').forEach(container => {
        let a = container.querySelector('a, input')
        if (a) {
            container.classList.add('has-a')
            container.addEventListener('click', click => a.click())
        }
    })
}
