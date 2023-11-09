/**
 * Word Switcher
 */
((switchers) => {

if (switchers.length === 0) return

switchers.forEach(switcher => {
    let placeholder = switcher.querySelector('.placeholder')
    let placeholderWidth = 0;
    let placeholderText;
    for (let i = 0; i <= switcher.children.length; i++) {
        let item = switcher.children[i]
        if (item && item.clientWidth > placeholderWidth) {
            placeholderWidth = item.clientWidth
            placeholderText = item.textContent
        }
    }
    if (!placeholder) {
        placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        placeholder.textContent = placeholderText;
        switcher.appendChild(placeholder);
    }
    if (!switcher.querySelector('.active')) {
        switcher.firstChild.classList.add('active')
    }

    let t = setInterval(() => {
        if (!switcher) {
            clearInterval(t);
            return
        }
        let prev = switcher.querySelector('.active'),
            next = prev.nextElementSibling;
        if (!next || next.classList.contains('placeholder')) {
            next =  switcher.firstChild;
        }
        next.classList.add('active');
        prev.classList.remove('active');
    }, 2000)
})

/*
switchers.forEach(switcher => {
    let placeholder = switcher.querySelector('.placeholder');
    if (!placeholder) {
        placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        placeholder.textContent = switcher.firstChild.textContent;
        switcher.appendChild(placeholder);
        switcher.firstChild.classList.add('active');
    }
    let prev = switcher.querySelector('.active'),
        next = prev.nextElementSibling;
    if (!next || next.classList.contains('placeholder')) {
        next =  switcher.firstChild;
    }
    next.classList.add('active');
    placeholder.innerHTML = next.textContent;
    prev.classList.remove('active');
});
*/

})(document.querySelectorAll('.js-switch'))
