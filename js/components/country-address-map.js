/**
 * Country address svg map
 */
((setCoords, newXHR, a, b, c) => {
    document.querySelectorAll(`.${a}-${b}-map`).forEach(x => {
        newXHR(window.ComponentLoader.themeURL + "/assets/offices.svg", (xhr) => {
            let div = document.createElement('div')
            div.innerHTML = xhr.responseText
            x.querySelector(`.${c}`).appendChild(div)
            x.querySelectorAll(`[class*="${b}-"]`).forEach(to => {
                setCoords(to, x.querySelector(`.${to.classList.value.replace(b, a)}`))
            })
            x.classList.add('loaded')
        })
    })
})(
    (from, to) => {
        let bbox = from.getBBox()
        to.style.width = `${bbox.width}px`
        to.style.height = `${bbox.height}px`
        to.style.top = `${bbox.y}px`
        to.style.left = `${bbox.x}px`
    },
    (url, callback) => {
        let request = new XMLHttpRequest()
        request.onreadystatechange = function(){
            if (this.readyState === 4
                && this.status === 200
                && this.responseText?.length > 0) {
                callback(this)
            }
        }
        request.open('GET', url)
        request.send()
    },
    'country',
    'address',
    'container'
)
