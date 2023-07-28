/**
 * File scripts.js.
 *
 * Contains misc. website-wide scripts
 */

window.DependencyLoader = window.DependencyLoader || {
    list: [],
    script(src){
        if (document.querySelector(`script[src="${src}"]`)) {
            this.trigger('DependencyLoaded', src);
        } else {
            var node = document.createElement('script');
            node.setAttribute('type', 'text/javascript');
            node.setAttribute('src', src);
            node.onload = this.trigger('DependencyLoaded', src);
            document.getElementsByTagName('head')[0].appendChild(node);
            this.list.push(src);
        }
    },
    style(href){
        if (document.querySelector(`link[href="${href}"]`)) {
            this.trigger('DependencyLoaded', href);
        } else {
            var node = document.createElement('link');
            node.setAttribute('rel', 'stylesheet');
            node.setAttribute('href', href);
            node.onload = this.trigger('DependencyLoaded', href);
            document.getElementsByTagName('head')[0].appendChild(node);
            this.list.push(href);
        }
    },
    trigger(name, value){
        document.dispatchEvent(new CustomEvent(name, {detail:value}));
    },
    load(dependencies, onDependenciesLoaded){
        const factory = this;
        var currentQueue = Object.keys(dependencies);
        if (typeof onDependenciesLoaded === 'function') {
            document.addEventListener('DependenciesLoaded', onDependenciesLoaded);
        }
        document.addEventListener('DependencyLoaded', event => {
            let i = currentQueue.indexOf(event.detail);
            if (i >= 0){
                currentQueue.splice(i, 1);
            }
            if (currentQueue.length === 0) {
                factory.trigger('DependenciesLoaded', dependencies);
            }
        });
        for (var dependencyURL in dependencies) {
            let dependencyType = dependencies[dependencyURL];
            if (factory[dependencyType]){
                factory[dependencyType](dependencyURL);
            }
        }
    }
};

/**
 * Link href # => javascript:void(0)
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href="#"]').forEach(a => {
        a.setAttribute('href', 'javascript:void(0)');
    })
});

/**
 * Slow scrollTo #anchor
 */
document.addEventListener('click', event => {
    if (event.target.href) {
        const url = new URL(event.target.href)
        if (url.pathname === location.pathname
            && url.hostname === location.hostname
            && url.hash != '') {
                const target = document.querySelector(url.hash)
                const masthead = document.getElementById('masthead')
                if (target) {
                    event.preventDefault()
                    let y = target.getBoundingClientRect().top + window.scrollY
                    if (masthead) y -= masthead.clientHeight
                    window.scroll({
                        top: y,
                        behavior: 'smooth'
                    })
                }
            }
    }
});

/**
 * Negative Spacer Block
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wp-block-spacer.negative').forEach(spacer =>{
        var s = window.getComputedStyle(spacer, null)
            h = parseInt(s.height, 10) * 2;
        spacer.style.marginTop = `-${h}px`;
    });
});

/**
 * Custom Tabs
 */
document.addEventListener('DOMContentLoaded', () => {
    var x = 'custom-tabs';
    document.querySelectorAll(`.${x}-container`).forEach(container => {
        var tabs = container.querySelector(`.${x}`),
            content = container.querySelector(`.${x}-content`);
        if (!tabs || !content) return;
        function dispatch(){
            let details = {detail:'scripts.js'}
            window.dispatchEvent(new CustomEvent('resize', details));
            window.dispatchEvent(new CustomEvent('tabChanged', details));
        }
        for (var i = 0; i < tabs.children.length; i++) {
            ((tab, i2) => {
                if (i2 === 0) {
                    tab.classList.add('active');
                    dispatch();
                }
                tab.addEventListener('click', () => {
                    for (var i3 = 0; i3 < tabs.children.length; i3++) {
                        tabs.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active');
                    }
                    for (var i3 = 0; i3 < content.children.length; i3++) {
                        content.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active');
                    }
                    container.scrollIntoView({ behavior: 'instant', block: 'start' });
                    dispatch();
                });
            })(tabs.children[i], i);
        }
        document.addEventListener('click', event => {
            if (event.target.classList.contains(`${x}-switcher`) ||
                event.target.parentNode.classList.contains(`${x}-switcher`)) {
                var nexTab = tabs.querySelector('.active').nextElementSibling;
                if (!nexTab) {
                    nexTab = tabs.children[0];
                }
                nexTab.dispatchEvent(new CustomEvent('click', {detail:'scripts.js'}));
            }
        });
    });
});

/**
 * Autoscroll, pause on hover
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.autoscrolled').forEach(e => {
        if (e.scrollWidth === e.clientWidth) return
        function autoScroll(){
            let before = e.scrollLeft
            e.scrollLeft += (e.classList.contains('reverse') ? -1 : 1)
            let after = e.scrollLeft
            if (after === before) e.classList.toggle('reverse')
        }
        let i = setInterval(autoScroll, 24)
        if (e.classList.contains('hoverstop')) {
            e.addEventListener('mouseenter', () => clearInterval(i))
            e.addEventListener('mouseleave', () => i = setInterval(autoScroll, 24))
        }
    })
});

/**
 * Autoscroll infinite left, pause on hover
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.autoscrolled-infinite').forEach(e => {
        let n = -1,
            sw = e.scrollWidth,
            cw = e.clientWidth,
            top = e.getBoundingClientRect().top,
            items = e.children
        while (items.length < 2) {
            items = items[0].children
            if (!items) break
        }
        function autoScroll(){
            if (sw === cw || top < 0) return
            e.scrollLeft++
            if (sw === e.scrollLeft + cw && items && items.length > 2) {
                items[0].parentNode.appendChild(items[++n].cloneNode(true))
                sw = e.scrollWidth
            }
        }
        let i = setInterval(autoScroll, 24)
        if (e.classList.contains('hoverstop')) {
            e.addEventListener('mouseenter', () => clearInterval(i))
            e.addEventListener('mouseleave', () => i = setInterval(autoScroll, 24))
        }
        let t
        window.addEventListener('resize', () => {
            clearTimeout(t)
            t = setTimeout(() => {
                sw = e.scrollWidth
                cw = e.clientWidth
                clearInterval(i)
                i = setInterval(autoScroll, 24)
            }, 100)
        })
        window.addEventListener('scroll', () => top = e.getBoundingClientRect().top)
    });
});

/**
 * Scroll on all element hover
 */
document.addEventListener('DOMContentLoaded', () => {

  if (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0)) return;

    document.querySelectorAll('.hoverscrolled').forEach(container => {
        var x = null;
        container.addEventListener('mouseenter', () => {
            if (container.scrollWidth === container.clientWidth) return;
            x = setInterval(() => {
                var before = container.scrollLeft;
                container.scrollLeft += (container.classList.contains('reverse') ? -1 : 1);
                var after = container.scrollLeft;
                if (after === before) {
                    container.classList.toggle('reverse');
                }
            }, 12);
        });
        container.addEventListener('mouseleave', () => clearInterval(x));
    });
});

/**
 * Scroll on left/right part hover
 */
document.addEventListener('DOMContentLoaded', () => {

  if (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0)) return;

    document.querySelectorAll('.hoverscrolled-alt').forEach(container => {
        var x = null,
            maxScrollLength = container.scrollWidth;
        window.addEventListener('resize', () => maxScrollLength = container.scrollWidth);
        function onMouseOver(event) {
            clearInterval(x);
            if (container.scrollWidth === container.clientWidth) return;
            x = setInterval(() => {
                if (event.clientX <= window.innerWidth * .25) {
                    container.scrollLeft--;
                } else if (event.clientX >= window.innerWidth * .75) {
                    if ((container.scrollLeft+container.clientWidth) < maxScrollLength) container.scrollLeft++;
                }
            }, 12);
        }
        container.addEventListener('mouseenter', onMouseOver);
        container.addEventListener('mouseover', onMouseOver);
        container.addEventListener('mouseleave', () => clearInterval(x));
    });
});

/**
 * Ajax Contact Form 7 Popup
 */
document.addEventListener('click', event => {
    const x = 'wpcf7-popup--';
    if (event.target.rel && event.target.rel.indexOf(x) === 0){
        event.preventDefault();
        if (typeof window.wpcf7 !== 'object') return;
        var formId = event.target.rel.replace(x, ''),
            popup = document.getElementById(x+formId);
        if (popup) {
            document.body.classList.add(x+'shown');
        } else {
            var request = new XMLHttpRequest(),
                q = new URLSearchParams({
                    'action': 'wpcf7_popup',
                    'form_id': formId
                }).toString();
            request.onreadystatechange = function() {
                if (this.readyState !== 4 || this.status !== 200) {
                    return;
                } else {
                    if (this.responseText != '') {
                        popup = document.createElement('div');
                        popup.setAttribute('id', x+formId);
                        popup.classList.add(x+'container');
                        var content = document.createElement('div'),
                            overlay = document.createElement('a'),
                            close = document.createElement('a');
                        overlay.addEventListener('click', () => document.body.classList.remove(x+'shown'));
                        close.addEventListener('click', () => document.body.classList.remove(x+'shown'));
                        content.classList.add(x+'content');
                        overlay.classList.add(x+'overlay');
                        close.classList.add(x+'close');
                        content.innerHTML = this.responseText;
                        popup.appendChild(overlay);
                        content.appendChild(close);
                        popup.appendChild(content);
                        document.body.appendChild(popup);
                        wpcf7.init(popup.querySelector('form'));
                        setTimeout(() => {
                            document.body.classList.add(x+'shown');
                        }, 100);
                    }
                }
            }
            request.open('GET', ajaxurl+'?'+q);
            request.send();
        }
    }
} );

/**
 * Word Switcher
 */
document.addEventListener('DOMContentLoaded', () => {
    const switchers = document.querySelectorAll('.js-switch')
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
});

/**
 * Industries full-page height
 */
((containerId, childSelector) => {
    window.addEventListener('resize', () => {
        const container = document.getElementById(containerId)
        const masthead = document.getElementById('masthead')
        if (!container || window.innerWidth < 782) return;
        function setCss(h) {
            let css = `#${containerId} ${childSelector}`
            let style = document.getElementById(containerId+'-styles')
            if (!style){
                style = document.createElement('style')
                style.setAttribute('id', containerId+'-styles')
                document.getElementsByTagName('head')[0].appendChild(style);
            }
            css += `{ min-height: ${h}px }`
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.textContent = css;
            }
        }
        var t = 0;
        clearTimeout(t)
        var t = setTimeout(() => {
            setCss(10)
            let h = 0;
            container.querySelectorAll(childSelector).forEach(block => {
                if (block.clientHeight > h) h = block.clientHeight
            })
            setCss(window.innerHeight - (container.clientHeight - h) - (masthead?masthead.clientHeight:0))
        }, 100)
    })
})('industries', '.wp-block-cover[class*="hover-"]');

/**
 * SVG Bubbles animation
 */
((w, d, q, o) => {
    o.get = (active) => {
        return d.querySelectorAll((active ? '.active ' : '') + q)
    }
    o.minmax = () => {
        o.min = 0
        o.max = 0
        const items = o.get(true)
        if (items.length > 0) {
            let e = items.item(0).parentNode/* svg */.parentNode
            if (e.offsetParent) {
                do {
                    o.min += e.offsetTop;
                    e = e.offsetParent;
                } while (e);
            }
            o.max = o.min + items.item(0).parentNode.clientHeight
        }
    }
    o.show = (items, force) => {
        if (items.length === 0) return false;
        const parent = items.item(0).parentNode
        const rect = parent.getBoundingClientRect()
        if ((rect.bottom > 0 && rect.bottom < w.innerHeight+rect.height/2) || force){
            let t = 1000 / items.length
            items.forEach((item, i) => {
                t += 100
                setTimeout(() => {
                    item.classList.add('active')
                }, t)
            })
        }
    }
    d.addEventListener('DOMContentLoaded', () => {
        if (o.get().length === 0) return;
        o.minmax()
    })
    let t;
    w.addEventListener('resize', ({detail}) => {
        if (detail) return
        clearTimeout(t)
        t = setTimeout(() => o.minmax(), 100)
    })
    w.addEventListener('scroll', () => {
        let cur = w.scrollY + w.innerHeight
        if (o.ready) return
        if ((cur > o.min && cur < o.max + w.innerHeight)
            || (cur > o.min && cur < o.max) ) {
            o.show(o.get(true), true)
            o.ready = true;
        }
    })
    w.addEventListener('tabChanged', () => {
        o.get().forEach(item => item.classList.remove('active'))
        o.show(o.get(true))
    })
})(window, document, '.circle-expand-animation', {min: 0, max: 0, ready: false});
