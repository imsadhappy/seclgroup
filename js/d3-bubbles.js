/**
 * File bubbles.js.
 *
 * Handles D3 bubbles widget render.
 */

(function(moduleID, selector){

window[moduleID] = window[moduleID] || {

    uids: 0,
    ready: false,
    instances: {},
    dependencies: {
        "https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.8/d3.min.js": "script",
        "https://d3js.org/d3-hierarchy.v1.min.js": "script"
    },

    parseData(node){
        var items = Array.from(node.children),
            data = {'children': []};
        if (items.length > 0) {
            for (var i = 0; i <= items.length; i++) {
                if (items[i]) {
                    let item = items[i].textContent.split(':');
                    if (item.length === 2) {
                        data.children.push({name: item[0], value: parseInt(item[1], 10)});
                    }
                }
            }
        }
        return data;
    },

    createChart(uid, data){
        const module = this;
        try {

            const target = document.querySelector(uid);
            data = data || module.parseData(target)

            if (data.children.length === 0) return;

            target.innerHTML = '';

            var maxH = 0;
            var vbWidth = target.parentNode.clientWidth;
            var vbHeight = window.innerHeight;

            if (vbHeight > 800) vbHeight = 800;
            if (vbWidth < vbHeight) vbHeight = vbWidth;

            var bubble = d3.pack().size([vbWidth, vbHeight]).padding(40);

            var svg = d3.select(uid)
            .append('svg')
            .attr('viewBox',`0 0 ${vbWidth} ${vbHeight}`)
            .attr('width', vbWidth)
            .attr('height', vbHeight)
            .attr('class', 'bubbles-chart-svg');

            var root = d3.hierarchy(data).sum(d => { return d.value; });

            bubble(root);

            var node = svg.selectAll('.node')
            .data(root.children)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => {
                var dx = Math.round(d.x),
                    dy = Math.round(d.y),
                    dh = Math.round(dy + d.r * 2);
                if (dh > maxH) {
                    maxH = dh;
                }
                return `translate(${dx} ${dy})`;
            })
            .append('g')
            .attr('class', 'graph');

            node.append("circle")
            .attr("r", d => { return d.r })
            .style("fill", "#EFA7DB");

            node.append("text")
            .attr("dy", "0.2em")
            .style("text-anchor", "middle")
            .style("font-size", item => {
                var maxSize = 30;
                var size = Math.min(maxSize, Math.round(item.r * 2 / item.data.name.length));
                return `${size}px`;
            })
            .text(item => {
                return item.data.name;
            })
            .style("fill", "#090F20")
            .style('pointer-events', 'none');

            bubble.size([vbWidth, maxH]);

            svg.attr('viewBox',`0 0 ${vbWidth} ${maxH}`)
            .attr('height', maxH);

            return {target, data, svg, root, bubble};

        } catch (e) {}
    },

    populate(container){
        const module = this;
        var uid = container.getAttribute('id');
        if (container.classList.contains('ready') && module.instances[uid]) {
            module.createChart('#'+uid, module.instances[uid].data);
        } else {
            uid = moduleID + (++module.uids);
            container.setAttribute('id', uid);
            var instance = module.createChart('#'+uid);
            if (instance) {
                module.instances[uid] = instance;
                container.classList.add('ready');
            }
        }
    },

    onResize(resizeEvent, selector){
        const module = this;
        clearTimeout(window[moduleID+'Resize']);
        if (!resizeEvent.detail && module.previousWidth == window.innerWidth) return;
        if (document.querySelectorAll(selector).length === 0) return;
        window[moduleID+'Resize'] = setTimeout(() => {
            if (typeof window.d3 === 'object') {
                document.querySelectorAll(selector).forEach(container => {
                    if (container.clientWidth > 0) {
                        module.populate(container);
                        module.previousWidth = window.innerWidth;
                        container.parentNode.style.minHeight = container.clientHeight+'px';
                    }
                });
            }
        }, 100);
    },

    onDependenciesLoaded(dependencies){
        const module = this;
        if (dependencies === module.dependencies) {
            const check = setInterval(() => {
                if (typeof window.d3 === 'object') {
                    clearInterval(check);
                    window.dispatchEvent(new CustomEvent('resize', {detail:moduleID}));
                }
            }, 100);
        }
    },

    init(selector){
        const module = this;
        if (!module.ready) {
            window.addEventListener('resize', resizeEvent => {
                module.onResize(resizeEvent, selector);
            });
            window.DependencyLoader.load(module.dependencies, dependenciesLoadedEvent => {
                module.onDependenciesLoaded(dependenciesLoadedEvent.detail)
            });
            module.ready = true;
        } else {
            window.dispatchEvent(new CustomEvent('resize', {detail:module.file}));
        }
    }
};

window[moduleID].init(selector);

})('d3Bubbles', '.d3-bubbles');
