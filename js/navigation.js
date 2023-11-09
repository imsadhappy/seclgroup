/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens.
 */
(function(header, menu){
	const menuContainer = header.querySelector('.menu-header-container')
	if (!menuContainer) return;
	const menuClone = menuContainer.cloneNode(true);
	menuClone.classList.replace('menu-header-container', 'menu-mobile-container');
	menuClone
	.querySelectorAll('[id]')
	.forEach(node =>
		node.setAttribute('id', 'mobile-'+node.getAttribute('id'))
	);
	menuContainer.parentNode.insertBefore(menuClone, menuContainer);
	const mobileMenu = document.querySelector('.menu-mobile-container');
	mobileMenu.dataset.previousWidth = window.innerWidth;
	function navigationResize() {
		if (!menu) return;
		let set = menu.clientWidth >= menuContainer.clientWidth ? 'add':'remove';
		if (window.innerWidth >= 1224) { set = 'remove'; }
		if (window.innerWidth <= 480) { set = 'add'; }
		menu.classList[set]('invisible');
		menuContainer.classList[set]('pointer');
		header.classList[set]('mobile');
		mobileMenu.classList.remove('show');
	}
	navigationResize()
	let t = 0
	window.addEventListener('resize', event => {
		if (mobileMenu.dataset.previousWidth == window.innerWidth
			&& !event.detail?.initiator) return;
		mobileMenu.dataset.previousWidth = window.innerWidth;
		clearTimeout(t);
		t = setTimeout(navigationResize, 100);
	});
	document.addEventListener('click', event => {
		const targetClass = event?.target?.classList
		if (!targetClass) return
		if (targetClass.contains('menu-item-has-children')) {
			event.preventDefault();
			if (targetClass.contains('touched')) {
				targetClass.remove('touched');
			} else {
				event.target.parentNode
				.querySelectorAll(':scope > .touched')
				.forEach(targetSibling =>
					targetSibling.classList.remove('touched')
				)
				targetClass.add('touched');
			}
		} else if (event.target === menuContainer
				&& targetClass.contains('pointer')) {
			mobileMenu.classList.toggle('show');
		}
	});
	if (!menu) return
	let t2 = 0
	menu.querySelectorAll(':scope > .menu-item-has-children').forEach(li1 => {
		let a1 = li1.firstChild,
			submenu = a1.nextElementSibling;
		if (submenu && submenu.classList.contains('sub-menu')) {
			submenu.addEventListener('deselect', () => {
				submenu
				.querySelectorAll('li.menu-item-has-children')
				.forEach((li2) => li2.classList.remove('active'));
			});
			li1.addEventListener('mouseenter', () => {
				clearTimeout(t2);
				header.classList.add('dropdown-menu-shown');
			});
			li1.addEventListener('mouseleave', () => {
				t2 = setTimeout(() =>
					header.classList.remove('dropdown-menu-shown'), 100)
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
})(
	document.getElementById('masthead'),
	document.getElementById('primary-menu')
);
