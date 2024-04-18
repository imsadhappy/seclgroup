/**
 * File component-loader.js.
 */
window.ComponentLoader = window.ComponentLoader || {
    list: [],
    script(src){
        if (document.querySelector(`script[src="${src}"]`)) {
            this.trigger('ComponentLoaded', src);
        } else {
            var node = document.createElement('script');
            node.setAttribute('type', 'text/javascript');
            node.setAttribute('src', src);
            node.onload = this.trigger('ComponentLoaded', src);
            document.getElementsByTagName('head')[0].appendChild(node);
            this.list.push(src);
        }
    },
    style(href){
        if (document.querySelector(`link[href="${href}"]`)) {
            this.trigger('ComponentLoaded', href);
        } else {
            var node = document.createElement('link');
            node.setAttribute('rel', 'stylesheet');
            node.setAttribute('href', href);
            node.onload = this.trigger('ComponentLoaded', href);
            document.getElementsByTagName('head')[0].appendChild(node);
            this.list.push(href);
        }
    },
    trigger(name, value){
        document.dispatchEvent(new CustomEvent(name, {detail:value}));
    },
    load(components, onComponentssLoaded){
        const factory = this;
        if (typeof components === 'string') {
            let singleComponent = components
            components = {}
            components[singleComponent] = 'script'
        }
        console.info('USING COMPONENT:',
                     Object.keys(components)
                           .join(', ')
                           .replace(new RegExp(factory.themeURL, 'g'), ''))
        var currentQueue = Object.keys(components);
        if (typeof onComponentssLoaded === 'function') {
            document.addEventListener('ComponentsLoaded', onComponentssLoaded);
        }
        document.addEventListener('ComponentLoaded', event => {
            let i = currentQueue.indexOf(event.detail);
            if (i >= 0){
                currentQueue.splice(i, 1);
            }
            if (currentQueue.length === 0) {
                factory.trigger('ComponentsLoaded', components);
            }
        });
        for (var componentURL in components) {
            let componentType = components[componentURL];
            if (factory[componentType]){
                factory[componentType](componentURL);
            }
        }
    }
}
