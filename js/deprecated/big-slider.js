/**
 * File big-slider.js.
 *
 * Uses tns slider
 */

window.mxBigSlider = window.mxBigSlider || {
    id: 'mx-big-slider',
    ready: false,
    instances: [],
    config: {
        loop: false,
        mouseDrag: false,
        fixedWidth: 990,
        gutter: 60,
        navPosition: 'bottom',
        controls: false,
        items: 1
    },
    resize: function(event) {
        const factory = this;
        //don't rebuild if resize is vertical
        if (factory.previousWidth === window.innerWidth && !window.adminpage) return;
        clearTimeout(factory.resizeTimeout);
        factory.resizeTimeout = setTimeout(function(){
            if (typeof tns !== 'function') {
                window.tnsComponents.load();
            } else {
                factory.rebuild();
                factory.create();
                factory.previousWidth = window.innerWidth;
            }
        }, 100);
    },
    click: function(event) {
        const factory = this;
        var slider = false,
            next = false,
            prev = false,
            n = 0,
            target = event.target,
            parent = target.parentNode,
            targetClass = target.classList;
        if (targetClass.contains('tns-item')) {
            slider = parent;
            n = parseInt(target.getAttribute('id').split('-item')[1], 10);
        } else if (targetClass.contains(`${factory.id}--next`)) {
            slider = parent.querySelector('.tns-slider');
            next = true;
        } else if (targetClass.contains(`${factory.id}--prev`)) {
            slider = parent.querySelector('.tns-slider');
            prev = true;
        } else {
            return;
        }
        factory.each(function(instance, i){
            try {
                var info = instance.getInfo();
                if (info.container === slider) {
                    if (prev) {
                        n = info.index - 1;
                    } else if (next) {
                        n = info.index + 1;
                    }
                    info.navItems[n].click();
                }
            } catch (e) {}
        });
    },
    create: function() {
        const factory = this;
        document.querySelectorAll(`.${factory.id}--content`).forEach((wrapper) => {
            if (!wrapper.classList.contains('tns-slider') && wrapper.children.length > 0) {
                var next = document.createElement('div'),
                    prev = document.createElement('div');
                next.classList.add(`${factory.id}--next`);
                prev.classList.add(`${factory.id}--prev`);
                wrapper.parentNode.insertBefore(prev, wrapper);
                wrapper.parentNode.appendChild(next);
                var config = Object.assign({}, factory.config);
                config.container = wrapper;
                var newInstance = tns(config);
                factory.instances.push(newInstance);
            }
        });
    },
    rebuild: function() {
        const factory = this;
        factory.each(function(instance, i){
            try {
                if (instance.destroy) { instance.destroy(); }
                if (instance.rebuild) { factory.instances[i] = instance.rebuild(); }
            } catch (e) {}
        });
    },
    each: function(callback) {
        const factory = this;
        for (var i = 0; i < factory.instances.length; i++) {
            if (factory.instances[i]) {
                callback(factory.instances[i], i);
            }
        }
    },
    init: function(){
        const factory = this;
        if (!factory.ready) {
            window.addEventListener('resize', function(event){
                factory.resize(event);
            });
            document.addEventListener('click', function(event){
                factory.click(event);
            });
            factory.ready = true;
        };
        window.dispatchEvent(new Event('resize'));
    }
};

window.mxBigSlider.init();
