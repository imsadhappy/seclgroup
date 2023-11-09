/**
 * Simple Accordeon
 */
document.addEventListener('click', event => {
    let label = false
    const node = event.target
    const x = 'accordeon-label'
    if (!node) return
    if (node.classList.contains(x)) {
        label = node
    } else if (node.parentNode.classList.contains(x)) {
        label = node.parentNode
    }  else if (node.parentNode.parentNode.classList.contains(x)) {
        label = node.parentNode.parentNode
    }
    if (label) {
        const tab = label.parentNode
        const container = tab.parentNode
        if (container && container.classList.contains('accordeon')) {
            for (let i = 0; i <= container.children.length; i++) {
                container.children[i]?.classList?.remove('active')
            }
            tab.setAttribute('tabindex', '0')
            tab.classList.add('active')
            tab.focus()
        }
    }
})
