/**
 * File side-image-slider.js.
 *
 * Uses tns slider
 */

window.mxSideImageSlider = window.mxSideImageSlider || {
    id: null,
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
    sections: function() {
        return document.querySelectorAll(`.${this.id}-section`);
    },
    sliders: function() {
        return document.querySelectorAll(`.${this.id}-slider`);
    },
    wrap: function() {
        const factory = this;
        factory.sections().forEach((container) => {
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
        factory.sliders().forEach((slider) => {
            if (!slider.classList.contains('tns-slider') && slider.children.length > 0) {
                var config = Object.assign({}, factory.config);
                config.container = slider;
                var instance = tns(config);
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
            let info = instance?.getInfo();
            if (!instance || !info || !info.navItems) {
                setTimeout(function(){
                    factory.watch();
                }, 100);
            } else {
                instance.events.on('transitionEnd', function(){
                    factory.updateMobileNav(instance);
                });
                instance.events.on('transitionStart', function(){
                    factory.updateMobileNav(instance, true);
                });
                instance.events.on('touchEnd', function(){
                    factory.scrollIntoView(instance);
                });
                instance.events.on('dragEnd', function(){
                    factory.scrollIntoView(instance);
                });
                try {
                    for (let i = 0; i < info.navItems.length; i++) {
                        let nav = info.navItems[i];
                        if (nav && !nav.classList.contains('is-watched')) {
                            nav.addEventListener('click', function(){
                                factory.scrollIntoView(instance);
                            });
                            nav.classList.add('is-watched');
                        }
                    }
                } catch (e) {}
            }
        });
    },
    scrollIntoView: function(instance) {
        const factory = this;
        const info = instance?.getInfo();
        if (!info || !info.container) {
            setTimeout(function(){
                factory.scrollIntoView();
            }, 100);
        } else {
            if (info.container.getBoundingClientRect().y < 0) {
                info.container.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }
    },
    updateMobileNav: function(instance, transitionStart) {
        if (window.innerWidth > 782) return;
        const factory = this;
        const info = instance?.getInfo();
        if (!info || !info.container || !info.navContainer) {
            setTimeout(function(){
                factory.updateMobileNav();
            }, 100);
        } else {
            if (transitionStart) {
                info.navContainer.classList.add('disabled');
            } else {
                var updateInterval = setInterval(function(){
                    var firstCol = info.container.querySelector('.tns-slide-active :first-child');
                    if (firstCol) {
                        var h = firstCol.offsetHeight;
                        info.navContainer.style.top = `${h}px`;
                        info.navContainer.classList.remove('disabled');
                        clearInterval(updateInterval);
                    }
                }, 100);
            }
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
        if (factory.previousWidth == window.innerWidth || window.adminpage) return;
        clearTimeout(factory.resizeTimeout);
        factory.resizeTimeout = setTimeout(function(){
            if (factory.sections().length === 0 && factory.sliders().length === 0) return;
            if (typeof tns !== 'function') {
                window.tnsComponents.load();
            } else {
                factory.wrap();
                factory.rebuild();
                factory.create();
                factory.watch();
                factory.previousWidth = window.innerWidth;
            }
        }, 100);
    },
    init: function(selector){
        const factory = this;
        factory.id = selector;
        if (!factory.ready) {
            window.addEventListener('resize', function(event){
                factory.resize(event);
            });
            factory.ready = true;
        };
        window.dispatchEvent(new CustomEvent('resize', {detail:'side-image-slider.js'}));
    }
};

window.mxSideImageSlider.init('mx-side-image');
