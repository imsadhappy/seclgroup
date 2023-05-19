/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens.
 */
(function(){
	var header = document.getElementById('masthead'),
		menu = document.getElementById('primary-menu'),
		menuContainer = header.querySelector('.menu-header-container'),
		menuClone = menuContainer.cloneNode(true);
	menuClone.classList.replace('menu-header-container', 'menu-mobile-container');
	menuClone.querySelectorAll('[id]').forEach(function(node){
		node.setAttribute('id', 'mobile-'+node.getAttribute('id'));
	});
	menuContainer.parentNode.insertBefore(menuClone, menuContainer);
	var mobileMenu = document.querySelector('.menu-mobile-container');
	window.addEventListener('resize', function(){
		clearTimeout(window.navigationResize);
		window.navigationResize = setTimeout(function(){
			var set = menu.clientWidth >= menuContainer.clientWidth ? 'add':'remove';
			if (window.innerWidth >= 1224) { set = 'remove'; }
			if (window.innerWidth <= 480) { set = 'add'; }
			menu.classList[set]('invisible');
			menuContainer.classList[set]('pointer');
			header.classList[set]('mobile');
			mobileMenu.classList.remove('show');
		}, 100);
	});
	document.addEventListener('click', function(event){
		var targetClass = event.target.classList, c = 'touched';
		if (targetClass.contains('menu-item-has-children')) {
			event.preventDefault();
			if (targetClass.contains(c)) {
				targetClass.remove(c);
			} else {
				mobileMenu.querySelectorAll('.'+c).forEach(function(touched){
					touched.classList.remove(c);
				});
				targetClass.add(c);
			}
		} else if (event.target === menuContainer && targetClass.contains('pointer')) {
			mobileMenu.classList.toggle('show');
		}
	});
	window.dispatchEvent(new Event('resize'));
})();
