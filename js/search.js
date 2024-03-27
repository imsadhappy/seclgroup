/**
 * File search.js.
 *
 * Handles site search cloning, toggling & submit.
 */
(findParent => {
	document.addEventListener('submit', event => {
		const searchField = event.target.querySelector('.search-field')
		if (searchField && searchField.value === '') {
			event.preventDefault()
		}
	})
	document.addEventListener('search', event => {
		const searchForm = findParent(event.target, node => node.classList.contains('search-form'))[0]
		if (searchForm && event.target.value == ''){
  			const q = new URLSearchParams(window.location.search)
			q.delete('s')
			window.location = window.location.origin+
							  window.location.pathname+
							  (q.toString() == '' ? '' : '?'+q.toString())
		}
	})
})(
(node, filter) => {
    let x = [], y = node?.parentNode
    while (y !== document) {
        x.push(y)
        y = y.parentNode ?? document
    }
    return x.filter(filter)
})
