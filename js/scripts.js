/**
 * File scripts.js.
 *
 * Contains misc. website-wide scripts
 */

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
                    window.dispatchEvent(new CustomEvent('resize', {detail:{initiator:'scripts.js'}}));
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
                nexTab.dispatchEvent(new CustomEvent('click', {detail:{initiator:'scripts.js'}}));
            }
        });
    });
});

window.tnsComponents = window.tnsComponents || {
    list: [],
    load: function() {
        if (this.list.length === 2) {
            window.dispatchEvent(new Event('resize'));
            return;
        }
        let script = null;
        let style = null;
        let cdn = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4';
        let head = document.getElementsByTagName('head')[0];
        // script
        if (!document.getElementById('tns-script')) {
            script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('id', 'tns-script');
            script.setAttribute('src', cdn+'/min/tiny-slider.js');
            script.onload = this.register(script);
            head.appendChild(script);
        }
        // style
        if (!document.getElementById('tns-style')) {
            style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('id', 'tns-style');
            style.setAttribute('href', cdn+'/tiny-slider.css');
            style.onload = this.register(style);
            head.appendChild(style);
        }
    },
    register: function(dependency) {
        this.list.push(dependency);
        if (this.list.length === 2) {
            window.dispatchEvent(new Event('resize'));
        }
    }
};

/**
 * Simple scroller animation
 */
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.autoscrolled').forEach(function(e){
        setInterval(function(){
            var before = e.scrollLeft;
            e.scrollLeft += (e.classList.contains('reverse') ? -1 : 1);
            var after = e.scrollLeft;
            if (after === before) {
                e.classList.toggle('reverse');
            }
        }, 24);
    });
});
