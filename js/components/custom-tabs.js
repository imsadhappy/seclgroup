/**
 * Custom Tabs
 */
((x) => {

document.querySelectorAll(`.${x}-container`).forEach(container => {

    const tabs = container.querySelector(`.${x}`)
    const content = container.querySelector(`.${x}-content`);
    if (!tabs || !content) return;

    function dispatch(tab, content){
        let detail = { tab, content, container }
        window.dispatchEvent(new CustomEvent('resize', {detail}))
        window.dispatchEvent(new CustomEvent('tabChanged', {detail}))
        //tab.blur()
        //tab.parentElement.blur()
        //content.focus()
    }

    for (var i = 0; i < tabs.children.length; i++) {
        ((tab, i2) => {
            /*if (i2 === 0) {
                tab.classList.add('active');
                dispatch();
            }*/
            tab.addEventListener('click', () => {
                if (tab.classList.contains('active')) {
                    tabs.classList.remove('is-changed')
                    return
                }
                for (var i3 = 0; i3 < tabs.children.length; i3++) {
                    tabs.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active')
                }
                for (var i3 = 0; i3 < content.children.length; i3++) {
                    content.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active')
                    /*if (i3 === i2) {
                        content.children[i3].setAttribute('tabindex', '0')
                        content.children[i3].focus()
                    }*/
                }
                //container.scrollIntoView({ behavior: 'instant', block: 'start' });
                dispatch(tab, content.children[i2])
                tabs.classList.add('is-changed')
            });
        })(tabs.children[i], i);
    }

    tabs.addEventListener('mouseover', () => tabs.classList.remove('is-changed'))

    document.addEventListener('click', click => {
        if (click.target.classList.contains(`${x}-switcher`) ||
            click.target.parentNode?.classList.contains(`${x}-switcher`)) {
            var nexTab = tabs.querySelector('.active').nextElementSibling;
            if (!nexTab) {
                nexTab = tabs.children[0];
            }
            nexTab.dispatchEvent(new CustomEvent('click', {detail:'custom-tabs.js'}));
        }
    });
})

})('custom-tabs')
