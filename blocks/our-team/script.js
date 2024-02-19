/**
 * File our-team.js
 *
 * Handles our team block render.
 */
((M, W, D) => {

    if (W.adminpage) return;

    const instance = {
        done: false,
        loaded: false,
        container: null,
        items: [],
        canTouch: ('ontouchstart' in W) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        data(from, key) {
            return parseInt(from.dataset[key ?? 'i'], 10)
        },
        getAltImageNumber(target, row, col) {
            let x = this.data(target, 'row'),
                y = this.data(target, 'col'),
                n = 0;
            if (x < row) { //row before: 4, 5, 6
                n = y <= col ? (y < col ? 4 : 5) : 6
            } else if (x > row) { //row after: 1, 2, 8
                n = y <= col ? (y < col ? 2 : 1) : 8
            } else { //same row: 3, 7
                n = y < col ? 3 : 7
            }
            return n
        },
        getImage(item, key, data) {
            if (!data[key]) return
            let image = item.querySelector(`img.${key}`)
            if (!image) {
                image = D.createElement('img')
                image.src = data[key].url
                image.width = data[key].width
                image.height = data[key].height
                image.style.opacity = 0
                image.onload = () => (image.style.opacity = 1)
                item.appendChild(image)
                image.classList.add(key)
            }
            return image
        },
        activate(item, key, data) {
            let image = this.getImage(item, key, data)
            if (!image) return
            image.classList.add('active')
        },
        trigger(event, detail) {
            this.container.dispatchEvent(new CustomEvent(`${M}:${event}`, {detail}))
        },
        onmouseenter(item) {
            if (this.done) return
            let i = this.data(item)
            i = i+1 > 4 ? 4 : i+1
            item.dataset.i = i
            this.container.querySelectorAll('img').forEach(img => {
                img.classList.remove('active')
            })
            this.trigger('activate', {
                item, i,
                row: this.data(item, 'row'),
                col: this.data(item, 'col')
            })
            if (i == 4) {
                this.done = true
                this.container.classList.remove('hovered')
                this.container.classList.add('done')
            } else {
                this.container.classList.add('hovered')
            }
        },
        onmouseleave(item) {
            if (this.done) return
            this.container.classList.remove('hovered')
            this.trigger('deactivate', {
                item,
                i: this.data(item),
                row: this.data(item, 'row'),
                col: this.data(item, 'col')
            })
        },
        onactivate(item, data, detail) {
            let {i, row, col} = detail
            if (detail.item == item) {
                this.activate(item, `img_${i}`, data)
            } else {
                this.activate(item, i === 4 ? 'img_4' : `img_${i}_alt_${this.getAltImageNumber(item, row, col)}`, data)
            }
        },
        ondeactivate(item, data, detail) {
            let {i, row, col} = detail
            if (detail.item == item) {
                this.getImage(item, `img_${i+1}`, data)
            } else {
                this.getImage(item, i+1 === 4 ? 'img_4' : `img_${i+1}_alt_${this.getAltImageNumber(item, row, col)}`, data)
            }
        },
        onresize() {
            let row = 1, col = 0
            this.items.forEach(({item}) => {
                item.dataset.row = row
                item.dataset.col = ++col
                if (col == (W.innerWidth < 781 ? 3 : 5)) {
                    row++
                    col = 0
                }
            })
        },
        onscroll() {
            if (this.loaded) {
                console.log(this.canTouch)
            } else if ((this.container.getBoundingClientRect().y - W.innerHeight - 200) < 0) {
                this.items.forEach(({item, data}) => {
                    this.watch(item, data)
                    this.activate(item, `img_0`, data) //load
                    this.getImage(item, `img_1`, data) //preload
                })
                this.loaded = true
            }
        },
        watch(item, data) {
            item.addEventListener('mouseenter', () => this.onmouseenter(item))
            item.addEventListener('mouseleave', () => this.onmouseleave(item))
            item.addEventListener('click', () => item.classList.toggle('clicked'))
            this.container.addEventListener(`${M}:activate`, ({detail}) => this.onactivate(item, data, detail))
            this.container.addEventListener(`${M}:deactivate`, ({detail}) => this.ondeactivate(item, data, detail))
        },
        init(detail) {
            for (let id in detail) {
                this.container = D.getElementById(id)
                for (let itemId in detail[id]) {
                    let item = D.getElementById(itemId),
                        data = detail[id][itemId]
                    item.dataset.i = 0
                    this.items.push({item, data})
                }
            }
            this.onresize()
            this.onscroll()
            let t1, t2;
            W.addEventListener('resize', () => {
                clearTimeout(t1)
                t1 = setTimeout(() => this.onresize(), 100)
            })
            W.addEventListener('scroll', () => {
                clearTimeout(t2)
                t2 = setTimeout(() => this.onscroll(), 100)
            })
        }
    }

    D.addEventListener(`${M}:init`, ({detail}) => instance.init(detail))

})('ourTeam', window, document)
