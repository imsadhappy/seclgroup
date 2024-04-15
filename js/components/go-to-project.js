document.querySelectorAll('.go-to-project').forEach(project => {
    if (window.adminpage) return
    project.addEventListener('click', () => {
        if (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)) {
            var clicked = parseInt(project.dataset.clicked, 10)
            if (!clicked) {
                var siblings = project.parentElement.children;
                for (var i = 0; i < siblings.length; i++) {
                    siblings[i].dataset.clicked = 0
                }
                project.dataset.clicked = 1
            } else {
                window.location = project.dataset.url
            }
        } else {
            window.location = project.dataset.url
        }
    })
})
