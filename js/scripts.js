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
 * # to javascript:void(0)
 */
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('a[href="#"]').forEach(function(a){
        a.setAttribute('href', 'javascript:void(0)');
    })
});

/**
 * Simple Negative Spacers
 */
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.wp-block-spacer.negative').forEach(function(e){
        e.style.marginTop = `-${e.offsetHeight*2}px`;
    });
});

/**
 * Tabs
 */
document.addEventListener('DOMContentLoaded', function(){
    var x = 'custom-tabs';
    document.querySelectorAll(`.${x}-container`).forEach(function(container){
        var tabs = container.querySelector(`.${x}`),
            content = container.querySelector(`.${x}-content`),
            parent = container.parentNode;
        if (!tabs || !content) {
            return;
        }
        for (var i = 0; i < tabs.children.length; i++) {
            (function(tab, i2){
                tab.addEventListener('click', function(){
                    for (var i3 = 0; i3 < tabs.children.length; i3++) {
                        tabs.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active');
                    }
                    for (var i3 = 0; i3 < content.children.length; i3++) {
                        content.children[i3].classList[i3 === i2 ? 'add' : 'remove']('active');
                    }
                    if (parent.getBoundingClientRect().y < 0) {
                        parent.scrollIntoView({ behavior: 'instant', block: 'start' });
                    }
                    window.dispatchEvent(new CustomEvent('resize', {detail:'scripts.js'}));
                });
            })(tabs.children[i], i);
        }
        document.addEventListener('click', function(event){
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
 * Simple scroller animation
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.autoscrolled').forEach(container => {
        if (container.scrollWidth === container.clientWidth) return;
        setInterval(() => {
            var before = container.scrollLeft;
            container.scrollLeft += (container.classList.contains('reverse') ? -1 : 1);
            var after = container.scrollLeft;
            if (after === before) {
                container.classList.toggle('reverse');
            }
        }, 24);
    });
});

/**
 * Simple hoverscroll animation
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hoverscrolled').forEach(container => {
        if (container.scrollWidth === container.clientWidth) return;
        var x = null;
        container.addEventListener('mouseenter', () => {
            x = setInterval(() => {
                var before = container.scrollLeft;
                container.scrollLeft += (container.classList.contains('reverse') ? -1 : 1);
                var after = container.scrollLeft;
                if (after === before) {
                    container.classList.toggle('reverse');
                }
            }, 12);
        });
        container.addEventListener('mouseleave', () => {
            clearInterval(x)
        });
    });
});

/**
 * Ajax Contact Form 7 Popup
 */
document.addEventListener('click', function(event){
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
            request.onreadystatechange = function(){
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
                        setTimeout(function(){
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
