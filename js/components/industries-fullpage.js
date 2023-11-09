/**
 * Industries full-page height
 */
((containerId, childSelector) => {
    window.addEventListener('resize', () => {
        const container = document.getElementById(containerId)
        const masthead = document.getElementById('masthead')
        if (!container || window.innerWidth < 782) return;
        function setCss(h) {
            let css = `#${containerId} ${childSelector}`
            let style = document.getElementById(containerId+'-styles')
            if (!style){
                style = document.createElement('style')
                style.setAttribute('id', containerId+'-styles')
                document.getElementsByTagName('head')[0].appendChild(style);
            }
            h = h > 500 ? 500 : (h < 300 ? 300 : h)
            css += `{ min-height: ${h}px }`
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.textContent = css;
            }
        }
        var t = 0;
        clearTimeout(t)
        var t = setTimeout(() => {
            setCss(10)
            let h = 0;
            container.querySelectorAll(childSelector).forEach(block => {
                if (block.clientHeight > h) h = block.clientHeight
            })
            setCss(window.innerHeight - (container.clientHeight - h) - (masthead?masthead.clientHeight:0))
        }, 100)
    })
})('industries', '.wp-block-cover[class*="hover-"]');
