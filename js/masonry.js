/**
 * File masonry.js.
 *
 * Handles masonry widget render.
 */

window.MasonryLoader = window.MasonryLoader|| {

    ready: false,
    instances: {},
    delayedInstances: [],
    dependencies: {
        "https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js": "script"
    },

    imageLoaded(containerId) {
        const module = this;
        if (module.instances[containerId]) {
            var instance = module.instances[containerId];
            if (typeof instance.imageLoaded === 'function') {
                instance.imageLoaded();
            } else {
                instance.loadedImages++;
            }
        } else {
            module.instances[containerId] = {loadedImages:1};
        }
    },

    checkInstances(){
        const module = this;
        for (let containerId in module.instance) {
            module.instance[containerId].check();
        }
    },

    createInstance(containerId, imageCount) {
        const module = this;
        var instance = {
            masonry: null,
            loadedImages: 0,
            imageCount: imageCount
        };
        instance.imageLoaded = function(n){
            if (!n) n = 1;
            instance.loadedImages += n;
            instance.check();
        };
        instance.check = function(){
            if (instance.imageCount === instance.loadedImages && !instance.masonry) {
                const check = setInterval(()=>{
                    if (typeof Masonry === 'function') {
                        clearInterval(check);
                        instance.masonry = new Masonry('#'+containerId, {
                            percentPosition: true,
                            columnWidth: `#${containerId} .grid-size`
                        });
                    }
                }, 100);
            }
        };
        if (module.instances[containerId]) {
            instance.imageLoaded(module.instances[containerId].loadedImages);
        }
        module.instances[containerId] = instance;
    },

    load(containerId, imageCount){
        const module = this;
        if (!module.ready) {
            window.DependencyLoader.load(module.dependencies, dependenciesLoadedEvent => {
                if (dependenciesLoadedEvent.detail === module.dependencies) {
                    const check = setInterval(()=>{
                        if (typeof Masonry === 'function') {
                            clearInterval(check);
                            module.ready = true;
                            module.checkInstances();
                        }
                    }, 100);
                }
            });
        }
        module.createInstance(containerId, imageCount);
    }
};
