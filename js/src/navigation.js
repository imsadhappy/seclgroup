/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens.
 */
export default () => {

	const header = document.getElementById('masthead')
	const menu = document.getElementById('primary-menu')
	const menuContainer = header?.querySelector('.menu-header-container')

	if (!menuContainer || !header || !menu) return

	let mobileMenu = null

	const createMobileMenu = container => {
		mobileMenu = container.cloneNode(true)
		mobileMenu.classList.replace('menu-header-container', 'menu-mobile-container')
		mobileMenu.querySelectorAll('[id]').forEach(node =>
			node.setAttribute('id', 'mobile-'+node.getAttribute('id'))
		)
		container.parentNode.insertBefore(mobileMenu, container)
		mobileMenu.dataset.previousWidth = window.innerWidth
	}

	const navigationResize = () => {
		let set = menu.clientWidth >= menuContainer.clientWidth ? 'add':'remove'
		if (window.innerWidth >= 1224) { set = 'remove' }
		if (window.innerWidth <= 480) { set = 'add' }
		menu.classList[set]('invisible')
		menuContainer.classList[set]('pointer')
		header.classList[set]('mobile')
		mobileMenu.classList.remove('show')
	}

	const setupMultilayerMenu = ul => {
		let t = 0
		ul.querySelectorAll(':scope > .menu-item-has-children').forEach(li1 => {

			let a1 = li1.firstChild, ul1 = a1.nextElementSibling
			if (!ul1 || !ul1.classList.contains('sub-menu')) return

			ul1.setAttribute('data-name', a1.textContent)
			ul1.addEventListener('deselect', () => {
				ul1.querySelectorAll('.menu-item-has-children').forEach((li2) => {
						li2.classList.remove('active')
						li2.querySelector('a')?.blur()
					})
			})
			ul1.querySelectorAll('.menu-item-has-children').forEach((li2, i) => {
				let activate = () => {
					ul1.dispatchEvent(new Event('deselect'))
					li2.classList.add('active')
					const ul2 = li2.querySelector(':scope > .sub-menu')
					if (ul2) ul2.scrollTop = 0
				}
				if (i === 0) {
					li2.classList.add('active', 'first-active')
					ul1.classList.add('multilayer')
					li1.classList.add('has-multilayer')
				}
				li2.addEventListener('mouseenter', activate)
				li2.addEventListener('click', activate)
			})

			li1.addEventListener('mouseenter', () => {
				clearTimeout(t)
				header.classList.add('dropdown-menu-shown')
			})
			li1.addEventListener('mouseleave', () => {
				t = setTimeout(() =>
					header.classList.remove('dropdown-menu-shown'), 100)
			})
		})
	}

	const attachEventListeners = () => {
		let t = 0
		window.addEventListener('resize', event => {
			if (mobileMenu.dataset.previousWidth == window.innerWidth
				&& !event.detail?.initiator) return
			mobileMenu.dataset.previousWidth = window.innerWidth
			clearTimeout(t)
			t = setTimeout(navigationResize, 100)
		})

		document.addEventListener('click', event => {
			const targetClass = event?.target?.classList
			if (!targetClass) return
			if (targetClass.contains('menu-item-has-children')) {
				event.preventDefault()
				const container = event.target.parentNode
				if (targetClass.contains('touched')) {
					targetClass.remove('touched')
					container.classList.remove('has-touched', 'has-touched-multilayer')
				} else {
					container.querySelectorAll(':scope > .touched')
							.forEach(targetSibling =>
								targetSibling.classList.remove('touched')
							)
					targetClass.add('touched')
					container.classList.add('has-touched')
					if (targetClass.contains('has-multilayer')) {
						container.classList.add('has-touched-multilayer')
					}
				}
			} else if (event.target === menuContainer
					&& targetClass.contains('pointer')) {
				mobileMenu.classList.toggle('show')
				document.body.classList.toggle('mobile-menu-active')
				if (!mobileMenu.classList.contains('show')) {
					setTimeout(() => {
						mobileMenu.querySelectorAll('.touched, .has-touched').forEach(
							touched => touched.classList.remove('touched', 'has-touched', 'has-touched-multilayer')
						)
						mobileMenu.querySelectorAll('.active, .first-active').forEach(
							active => active.classList[active.classList.contains('first-active') ? 'add' : 'remove']('active')
						)
					}, 333)
				}
			}
		})
	}

	setupMultilayerMenu(menu)
	createMobileMenu(menuContainer)
	setTimeout(() => {
		setupMultilayerMenu(mobileMenu.firstChild)
		navigationResize()
		attachEventListeners()
		menuContainer.classList.add('ready')
	}, 33)
}
