/**
 * File our-team.js
 *
 * Handles our team block render.
 */
((M, I, W, D) => {

    if (W.adminpage) return;

    const instance = {
        done: false,
        loaded: false,
        container: null,
        items: [],
        rows: 1,
        cols: 1,
        canTouch: ('ontouchstart' in W) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        is(value) {
            this.container.classList.add(value)
        },
        not(value) {
            this.container.classList.remove(value)
        },
        data(from) {
            let {i, row, col} = from.dataset
            return {i: parseInt(i, 10),
                    row: parseInt(row, 10),
                    col: parseInt(col, 10)}
        },
        getColCount() {
            return (W.innerWidth < 781 ? (W.innerWidth < 480 ? 1 : 3) : 5)
        },
        getAltImageNumber(target, row, col) {
            let x = this.data(target).row,
                y = this.data(target).col,
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
        getImage(key, item, data) {
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
        activate(key, item, data) {
            let image = this.getImage(key, item, data)
            if (!image) return
            image.classList.add('active')
        },
        trigger(event, detail) {
            this.container.dispatchEvent(new CustomEvent(`${M}:${event}`, {detail}))
        },
        onmouseenter(item) {
            if (this.done) return
            let i = this.data(item).i
            i = i+1 > I ? I : i+1
            item.dataset.i = i
            this.container.querySelectorAll('img').forEach(img => {
                img.classList.remove('active')
            })
            this.trigger('activate', {
                item, i,
                row: i == I ? 3 /* max rows: 5 */ : this.data(item).row,
                col: i == I ? Math.ceil(this.getColCount() / 2) : this.data(item).col
            })
            this.is('hovered')
            if (i == I) {
                setTimeout(() => this.is('done'), 333)
            }
        },
        onmouseleave(item) {
            this.not('hovered')
            if (item.dataset.i == I) {
                this.done = true
            }
            this.trigger('deactivate', {
                item,
                i: this.data(item).i,
                row: this.data(item).row,
                col: this.data(item).col
            })
        },
        onactivate(item, data, detail) {
            let {i, row, col} = detail
            if (detail.item == item && i != I) {
                this.activate(`img_${i}`, item, data)
            } else {
                this.activate(/*i === I ? `img_${I}` :*/ `img_${i}_alt_${this.getAltImageNumber(item, row, col)}`, item, data)
            }
        },
        ondeactivate(item, data, detail) {
            let {i, row, col} = detail
            if (detail.item == item) {
                this.getImage(`img_${i+1}`, item, data)
            } else {
                this.getImage(i+1 === I ? `img_${I}` : `img_${i+1}_alt_${this.getAltImageNumber(item, row, col)}`, item, data)
            }
        },
        onresize() {
            if (this.done) return
            this.items.forEach(({item}) => {
                item.dataset.row = this.rows
                item.dataset.col = this.cols
                if (this.cols == this.getColCount()) {
                    this.cols = 1
                    this.rows++
                } else {
                    this.cols++
                }

            })
        },
        onscroll() {
            if (this.done) return
            let offset = this.container.getBoundingClientRect().y - W.innerHeight
            if (this.loaded) {
                if (!this.canTouch || window.innerWidth > 480) return
                if (offset < 200) {
                    this.is('hovered')
                    this.items.forEach(({item, data}, n) => {
                        item.querySelectorAll('img.active').forEach(img => img.classList.remove('active'))
                        if (n+1 === this.items.length && item.getBoundingClientRect().y < W.innerHeight) {
                            this.is('done')
                        } else {
                            if (item.getBoundingClientRect().y < W.innerHeight / 2 || n === 0) {
                                this.activate(`img_0`, item, data)
                            } else {
                                this.activate(`img_1_alt_1`, item, data)
                            }
                        }
                    })
                }
            } else if (offset - 200 < 0) {
                this.items.forEach(({item, data}) => {
                    this.watch(item, data)
                    this.activate(`img_0`, item, data) //load
                    this.getImage(`img_1`, item, data) //preload
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

})('ourTeam', 4, window, document)
