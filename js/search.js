/**
 * File search.js.
 *
 * Handles site search cloning, toggling & submit.
 */
(function(){
	var search = document.querySelector('#masthead .search-form'),
        li = document.createElement('li'),
        searchClass = search.classList,
		searchClone = search.cloneNode(true);
	searchClone.classList.replace('search-form', 'mobile-search-form');
	li.appendChild(searchClone);
	document.getElementById('mobile-primary-menu').appendChild(li);
	window.addEventListener('resize', function(){
		searchClass.remove('active');
		document.body.classList.remove('search-is-active');
	});
	document.addEventListener('click', function(event){
		if (event.target === search) {
			searchClass.toggle('active');
			search.querySelector('.search-field')[searchClass.contains('active') ? 'focus':'blur']();
			document.body.classList.toggle('search-is-active');
		}
	});
	document.addEventListener('submit', function(event){
		var searchField = event.target.querySelector('.search-field');
		if (searchField && searchField.value === '') {
			event.preventDefault();
		}
	});
})();
