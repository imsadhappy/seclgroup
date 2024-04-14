/**
 * File review-slider.js.
 *
 * Scripts for review slider ACF block
 */
(moduleID => {

window[moduleID] = window[moduleID] || {
    ready: false,
    instances: [],
    resizeInterval: null,
    baseConfig: {
        loop: false,
        mouseDrag: false,
        navPosition: 'bottom',
        gutter: 40,
        controlsPosition: 'bottom',
        slideBy: 'page',
        fixedWidth: false,
        lazyload: true /* bugfix */
        /* navAsThumbnails: true */
    },
    components: {
        "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js": "script",
        "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css": "style"
    },
    updateInstance(instance, i) {
        if (i) {
            this.instances[i] = instance
        } else {
            this.instances.push(instance)
        }
        instance.updateSliderHeight()
        instance.events.on('transitionEnd', () => instance.updateSliderHeight())
    },
    create() {
        const module = this
        document.querySelectorAll(`.${moduleID}`).forEach(wrapper => {
            if (wrapper.classList.contains('tns-slider') || wrapper.children.length < 2) return
            let config = Object.assign({
                container: wrapper
            }, module.baseConfig)
            if (wrapper.classList.contains('layout-cards')) {
                config.responsive = {
                    530: {
                        fixedWidth: 480
                    }
                }
            } else if (wrapper.classList.contains('layout-default')) {
                config.autoHeight = true
            }
            module.updateInstance(tns(config))
        })
        document.querySelectorAll(`.tns-ovh`).forEach(ovh => ovh.classList.add('active'))
    },
    rebuild() {
        const module = this
        module.each((instance, i) => {
            try {
                if (instance.destroy) {
                    instance.destroy()
                }
                if (instance.rebuild) {
                    module.updateInstance(instance.rebuild(), i)
                }
            } catch (e) {}
        })
    },
    each(callback) {
        const module = this
        for (let i = 0; i < module.instances.length; i++) {
            if (module.instances[i]) {
                callback(module.instances[i], i)
            }
        }
    },
    resize() {
        const module = this
        //don't rebuild if resize is vertical
        if (module.previousWidth === window.innerWidth || window.adminpage) return
        clearInterval(module.resizeInterval)
        module.resizeInterval = setInterval(() => {
            if (typeof tns === 'function') {
                clearInterval(module.resizeInterval)
                module.rebuild()
                module.create()
                module.previousWidth = window.innerWidth
            }
        }, 100)
    },
    init(){
        const module = this
        if (!module.ready) {
            window.addEventListener('resize', () => module.resize())
            window.ComponentLoader.load(module.components, () => {
                window.dispatchEvent(new Event('resize'))
            })
            module.ready = true
        }
    }
}

window[moduleID].init()

})('review-slider')
