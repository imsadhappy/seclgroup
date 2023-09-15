/**
 * File search.js.
 *
 * Handles site search cloning, toggling & submit.
 */
(function(){
	document.addEventListener('submit', function(event){
		var searchField = event.target.querySelector('.search-field');
		if (searchField && searchField.value === '') {
			event.preventDefault();
		}
	});
})();
