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
 * Scroller
 */
document.addEventListener('DOMContentLoaded', function(){
    var x = 'custom-horizontal-scroller';
    window.addEventListener('resize', function(){
        document.querySelectorAll('.'+x).forEach(function(slider){
            if (slider.scrollWidth > slider.clientWidth) {
                slider.classList.add('has-scroller');
                if (!slider.nextElementSibling || !slider.nextElementSibling.classList.contains(x+'--trigger')) {
                    var arrow = document.createElement('button');
                    arrow.classList.add(x+'--trigger');
                    slider.parentNode.insertBefore(arrow, slider.nextSibling);
                    arrow.addEventListener('click', function(){
                        var x = 0;
                        if (arrow.classList.contains('reverse')) {
                            var scroll = slider.scrollLeft - slider.clientWidth;
                            x = scroll > 0 ? scroll : 0;
                        } else {
                            x = slider.scrollLeft + slider.clientWidth;
                        }
                        if (x === 0) {
                            arrow.classList.remove('reverse');
                        }
                        if (x > slider.scrollWidth - slider.clientWidth) {
                            arrow.classList.add('reverse');
                        }
                        slider.scrollLeft = x;
                    });
                }
            } else {
                slider.classList.remove('has-scroller');
                if (slider.nextElementSibling && slider.nextElementSibling.classList.contains(x+'--trigger')) {
                    slider.nextElementSibling.remove();
                }
            }
        });
    });
    window.dispatchEvent(new Event('resize'));
});

/**
 * Tabs
 */
document.addEventListener('DOMContentLoaded', function(){
    var x = '.custom-tabs';
    document.querySelectorAll(x+'-container').forEach(function(container){
        var tabs = container.querySelector(x),
            content = container.querySelector(x+'-content'),
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
                        parent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            })(tabs.children[i], i);
        }
    });
});

/**
 * Simple Negative Spacers
 */
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.wp-block-spacer.negative').forEach(function(spacer){
        spacer.style.marginTop = `-${spacer.offsetHeight*2}px`;
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var x = 'blue-wave-background',
        cover = document.querySelector('.wp-block-cover:first-child'),
        page = document.querySelector('.page-content'),
        entry = document.querySelector('.entry-content');
    if (document.querySelectorAll(`.${x}`).length === 0) return;
    var overlay = document.createElement('div');
    overlay.classList.add(`${x}--overlay`);
    if (cover) {
        cover.parentNode.insertBefore(overlay, cover.nextSibling);
    } else if (page) {
        page.insertBefore(overlay, page.firstChild);
    } else if (entry) {
        entry.insertBefore(overlay, entry.firstChild);
    } else {
        return;
    }
    document.body.classList.add(`${x}--ready`);
    window.addEventListener('scroll', function(){
        var page = document.getElementById('primary'),
            y = Math.round(window.scrollY/page.offsetHeight*100) / 5;
        document.querySelectorAll(`.${x}--wrapper img`).forEach(function(wave){
            wave.style.transform = `translateY(${y}%)`;
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

document.addEventListener('DOMContentLoaded', function(){
    const x = 'ajax-count-';
    document.querySelectorAll(`[class*="${x}"]`).forEach( counterContainer => {
        var postType = Array.from(counterContainer.classList).filter(c => c.indexOf(x) === 0)[0].replace(x, '');
        if (!postType) return;
        var counterElement = document.createElement('span');
        counterElement.classList.add(`${x}result`);
        counterElement.style.display = 'none';
        counterElement.innerHTML = 0;
        counterContainer.append(counterElement);
        let request = new XMLHttpRequest(),
            q = new URLSearchParams({
                'action': 'count_posts',
                'post_type': postType
            }).toString();
        request.onreadystatechange = function(){
            if (this.readyState !== 4 || this.status !== 200) {
                return;
            } else {
                const count = parseInt(this.responseText, 10);
                counterContainer.setAttribute(`data-${x}result`, count);
                document.dispatchEvent(new CustomEvent('AjaxCounted', {detail:{
                    'target': counterContainer,
                    'result': count
                }}));
                if (count > 0) {
                    counterElement.innerHTML = count;
                    counterElement.style.display = null;
                }
            }
        }
        request.open('GET', ajaxurl+'?'+q);
        request.send();
    } );

    // Initiate the wowjs
    new WOW().init();

} );

