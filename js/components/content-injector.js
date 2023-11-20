((items, container) => {
    if (items.length == 0 || !container) return
    items = [...items].reverse()
    function insertContent(){
        if (window.innerWidth > 1024 || container.classList.contains('js-inject-done')) return
        let containerChildren = container.querySelectorAll(':scope > p')
        let n = Math.floor(containerChildren.length / (items.length + 1))
        let i = 1
        items.forEach(node => {
            let clone = node.cloneNode(true)
            clone.classList.add('js-inject-item')
            if (containerChildren[i]) {
                container.insertBefore(clone, containerChildren[i])
            } else {
                container.appendChild(clone)
            }
            i += n
        })
        container.classList.add('js-inject-done')
    }
    insertContent()
    window.addEventListener('resize', insertContent)
})(
    document.querySelectorAll('.js-inject-content > *'),
    document.querySelector('.js-inject-container')
)
