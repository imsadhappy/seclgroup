/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens.
 */
(function(){
	var header = document.getElementById('masthead'),
		menu = document.getElementById('primary-menu'),
		menuContainer = header.querySelector('.menu-header-container'),
		headerHoverTimeout;
	if (!menuContainer) return;
	var menuClone = menuContainer.cloneNode(true);
	menuClone.classList.replace('menu-header-container', 'menu-mobile-container');
	menuClone.querySelectorAll('[id]').forEach(function(node){
		node.setAttribute('id', 'mobile-'+node.getAttribute('id'));
	});
	menuContainer.parentNode.insertBefore(menuClone, menuContainer);
	var mobileMenu = document.querySelector('.menu-mobile-container');
	mobileMenu.dataset.previousWidth = window.innerWidth;
	window.addEventListener('resize', function(event){
		if (mobileMenu.dataset.previousWidth == window.innerWidth && !event.detail?.initiator) return;
		mobileMenu.dataset.previousWidth = window.innerWidth;
		clearTimeout(window.navigationResize);
		window.navigationResize = setTimeout(function(){
			if (!menu) return;
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
		var targetClass = event.target.classList;
		if (targetClass.contains('menu-item-has-children')) {
			event.preventDefault();
			if (targetClass.contains('touched')) {
				targetClass.remove('touched');
			} else {
				event.target.parentNode.querySelectorAll(':scope > .touched').forEach(targetSibling => {
					targetSibling.classList.remove('touched');
				});
				targetClass.add('touched');
			}
		} else if (event.target === menuContainer && targetClass.contains('pointer')) {
			mobileMenu.classList.toggle('show');
		}
	});
	menu.querySelectorAll(':scope > .menu-item-has-children').forEach(li1 => {
		var a1 = li1.firstChild, submenu = a1.nextElementSibling;
		if (submenu && submenu.classList.contains('sub-menu')) {
			submenu.addEventListener('deselect', () => {
				submenu.querySelectorAll('li.menu-item-has-children')
				.forEach((li2) => li2.classList.remove('active'));
			});
			li1.addEventListener('mouseenter', () => {
				clearTimeout(headerHoverTimeout);
				header.classList.add('dropdown-menu-shown');
			});
			li1.addEventListener('mouseleave', () => {
				headerHoverTimeout = setTimeout(() => header.classList.remove('dropdown-menu-shown'), 100)
			});
			submenu.querySelectorAll('li.menu-item-has-children').forEach((li2, i) => {
				if (i === 0) {
					li2.classList.add('active');
					submenu.setAttribute('data-name', a1.textContent);
					submenu.classList.add('multilayer');
				}
				/*li2.addEventListener('mouseenter', () => {
					submenu.dispatchEvent(new Event('deselect'));
					li2.classList.add('active');
				});*/
				li2.addEventListener('click', () => {
					submenu.dispatchEvent(new Event('deselect'));
					li2.classList.add('active');
				});
			});
		}
	});
	window.dispatchEvent(new CustomEvent('resize', {detail:{initiator:'navigation.js'}}));
})();
