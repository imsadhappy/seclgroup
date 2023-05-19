/**
 * File side-image-slider.js.
 *
 * Uses tns slider
 */

window.mxSideImageSlider = window.mxSideImageSlider || {
    id: 'mx-side-image',
    ready: false,
    instances: [],
    config: {
        loop: false,
        mouseDrag: false,
        controls: false,
        items: 1,
        navPosition: 'bottom',
        autoHeight: true
    },
    wrap: function() {
        const factory = this;
        document.querySelectorAll(`.${factory.id}-section`).forEach((container) => {
            if(!container.querySelector(`.${factory.id}-slider`)) {
                var wrapper = document.createElement('div');
                wrapper.classList.add(`${factory.id}-slider`);
                wrapper.innerHTML = container.innerHTML;
                container.innerHTML = '';
                container.appendChild(wrapper);
            }
        });
    },
    create: function() {
        const factory = this;
        document.querySelectorAll(`.${factory.id}-slider`).forEach((slider) => {
            if (!slider.classList.contains('tns-slider') && slider.children.length > 0) {
                var config = Object.assign({}, factory.config);
                config.container = slider;
                var instance = tns(config);
                setTimeout(function(){
                    factory.update(instance);
                }, 100);
                factory.instances.push(instance);
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
    watch: function() {
        const factory = this;
        factory.each(function(instance){
            instance.events.on('transitionEnd', function(){
                factory.update(instance);
            });
            instance.events.on('transitionStart', function(){
                factory.update(instance, true);
            });
        });
    },
    update: function(instance, transitionStart) {
        if (window.innerWidth > 782) return;
        if (transitionStart) {
            instance.getInfo().navContainer.classList.add('disabled');
        } else {
            var updateInterval = setInterval(function(){
                var firstCol = instance.getInfo().container.querySelector('.tns-slide-active :first-child');
                if (firstCol) {
                    var h = firstCol.offsetHeight;
                    instance.getInfo().navContainer.style.top = `${h}px`;
                    instance.getInfo().navContainer.classList.remove('disabled');
                    clearInterval(updateInterval);
                }
            }, 100);
        }
    },
    each: function(callback) {
        const factory = this;
        for (var i = 0; i < factory.instances.length; i++) {
            if (factory.instances[i]) {
                callback(factory.instances[i], i);
            }
        }
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
                // create wrapper if doesn't exists
                factory.wrap();
                // rebuild slider
                factory.rebuild();
                factory.create();
                factory.watch();
                factory.previousWidth = window.innerWidth;
            }
        }, 100);
    },
    init: function(){
        const factory = this;
        if (!factory.ready) {
            window.addEventListener('resize', function(event){
                factory.resize(event);
            });
            factory.ready = true;
        };
        window.dispatchEvent(new Event('resize'));
    }
};

window.mxSideImageSlider.init();
