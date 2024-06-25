/**
 * File our-team.js
 *
 * Handles our team block render.
 */
((M, I, W, D) => {

    if (W.adminpage) return;

    const instance = {
        container: null,
        items: [],
        currentItemInViewport: null,
        scrollEventTimeout: null,
        $(className, target) {
            (target || this.container).classList.add(className)
        },
        _(className, target) {
            (target || this.container).classList.remove(className)
        },
        is(className, target) {
            return (target || this.container).classList.contains(className)
        },
        x(target) {
            let {i, row, col} = target.dataset
            return {i: parseInt(i, 10),
                    row: parseInt(row, 10),
                    col: parseInt(col, 10)}
        },
        canTouch() {
            return ('ontouchstart' in W) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
        },
        colCount() {
            return (W.innerWidth < 781 ? (W.innerWidth < 480 ? 1 : 3) : 5)
        },
        trigger(event, detail) {
            this.container.dispatchEvent(new CustomEvent(`${M}:${event}`, {detail}))
        },
        next(item) {
            let i = this.x(item).i
            i = i+1 > I ? I : i+1
            item.dataset.i = i
            return i
        },
        stop() {
            this._('hovered')
            setTimeout(() => this.$('done'), 333)
        },
        altImageNumber(target, row, col) {
            let x = this.x(target).row,
                y = this.x(target).col,
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
        loadImage(key, item, data) {
            if (!data[key]) return
            let image = item.querySelector(`img.${key}`)
            if (!image) {
                image = D.createElement('img')
                image.src = data[key].url
                image.width = data[key].width
                image.height = data[key].height
                image.alt = `${M} ${item.id} ${key}`
                //image.style.opacity = 0
                //image.onload = () => (image.style.opacity = 1)
                item.appendChild(image)
                this.$(key, image)
            }
            return image
        },
        deactivateAllImages(inside) {
            inside.querySelectorAll('img.active').forEach(img => this._('active', img))
        },
        activateImage(key, item, data) {
            this.deactivateAllImages(item)
            let image = this.loadImage(key, item, data)
            if (!image) return
            this.$('active', image)
        },
        activateItem(item, i, data) {
            let cols = this.colCount()
            if (cols === 1 && i == I) {
                this.activateImage(`img_${I}_alt_5`, item, data)
            } else {
                this.trigger('activate', {
                    item, i,
                    row: i == I ? 3 /* max rows: 5 */ : this.x(item).row,
                    col: i == I ? Math.ceil(cols / 2) : this.x(item).col
                })
            }
        },
        deactivateItem(item) {
            if (this.is('done')) return
            this._('hovered')
            this.trigger('deactivate', {
                item,
                i: this.x(item).i,
                row: this.x(item).row,
                col: this.x(item).col
            })
        },
        setColsRows(){
            this.rows = 1
            this.cols = 1
            this.items.forEach(({item}) => {
                item.dataset.row = this.rows
                item.dataset.col = this.cols
                if (this.cols == this.colCount()) {
                    this.cols = 1
                    this.rows++
                } else {
                    this.cols++
                }
            })
        },
        setMinMax(){
            this.min = 0 //reset!
            let e = this.container.parentNode
            if (e.offsetParent) {
                do {
                    this.min += e.offsetTop;
                    e = e.offsetParent;
                } while (e);
            }
        },
        maybeLoadImages() {
            if (
                this.is('loaded') ||
                this.is('done') ||
                this.min > W.scrollY + W.innerHeight * 2
            ) return
            this.items.forEach(({item, data}) => {
                if (this.is('watching', item)) return
                this.watch(item, data)
                this.$('watching', item)
                this.activateImage(`img_0`, item, data)
                this.loadImage(`img_1`, item, data) //preload
            })
            this.$('loaded')
        },
        onscroll() {
            this.maybeLoadImages()
            if (
                this.is('done') ||
                (W.scrollY + W.innerHeight / 2) < this.min
            ) return
            this.$('hovered')
            let endAnimation = false
            this.items.forEach(({item, data}, n) => {
                if (this.is('animating', item)) return
                if (this.x(item).i === I) {
                    endAnimation = true
                    return
                }
                let {y, height} = item.getBoundingClientRect()
                if (height < 1) return
                if (y < 50 || y + (height / 2) > W.innerHeight) return
                let i = this.next(item)
                //if (i === I) { endAnimation = true }
                this.activateImage(`img_${i}`, item, data)
                this.loadImage(`img_${i+1}`, item, data) //preload
                this.$('animating', item)
                setTimeout(() => {
                    this._('animating', item)
                }, 999)
            })
            if (endAnimation) {
                this.stop()
                this.items.forEach(({item, data}, n) => {
                    item.dataset.i = I
                    this.activateItem(item, I, data)
                })
            }
        },
        watch(item, data) {
            this.container.addEventListener(`${M}:activate`, ({detail}) => {
                let {i, row, col} = detail
                if (detail.item == item && i != I) {
                    this.activateImage(`img_${i}`, item, data)
                } else {
                    this.activateImage(`img_${i}_alt_${this.altImageNumber(item, row, col)}`, item, data)
                }
            })
            this.container.addEventListener(`${M}:deactivate`, ({detail}) => {
                let {i, row, col} = detail
                if (detail.item == item) {
                    this.loadImage(`img_${i+1}`, item, data)
                } else {
                    //this.loadImage(i+1 === I ? `img_${I}` : `img_${i+1}_alt_${this.altImageNumber(item, row, col)}`, item, data)
                }
            })
            item.addEventListener('click', () => item.classList.toggle('clicked'))
            if (!this.canTouch()) {
                const mouseenterEventListener = mouseenter => {
                    if (this.is('done')) {
                        item.removeEventListener('mouseenter', mouseenterEventListener)
                        return
                    }
                    this.$('hovered')
                    this.deactivateAllImages(this.container)
                    let i = this.next(item)
                    this.activateItem(item, i, data)
                    if (i == I) this.stop()
                }
                const mouseleaveEventListener = mouseleave => {
                    if (this.is('done')) {
                        item.removeEventListener('mouseleave', mouseleaveEventListener)
                        return
                    }
                    this._('hovered')
                    this.deactivateItem(item)
                }
                item.addEventListener('mouseenter', mouseenterEventListener)
                item.addEventListener('mouseleave', mouseleaveEventListener)
            }
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
            this.setColsRows()
            this.setMinMax()
            this.maybeLoadImages()
            let resizeEventTimeout
            W.addEventListener('resize', () => {
                clearTimeout(resizeEventTimeout)
                resizeEventTimeout = setTimeout(() => {
                    this._('loaded')
                    this.setColsRows()
                    this.setMinMax()
                    this.maybeLoadImages()
                    if (this.is('done')) {
                        this.items.forEach(({item, data}, n) => this.activateItem(item, I, data))
                    }
                }, 111)
            })
            let scrollEventTimeout
            const windowScrollEventListener = () => {
                clearTimeout(scrollEventTimeout)
                if (this.is('done')) {
                    W.removeEventListener('scroll', windowScrollEventListener)
                } else {
                    if (this.canTouch()) {
                        scrollEventTimeout = setTimeout(() => this.onscroll(), 111)
                    } else {
                        this.maybeLoadImages()
                    }
                }
            }
            W.addEventListener('scroll', windowScrollEventListener)
            D.addEventListener('DOMContentLoaded', () => {
                this.setColsRows()
                this.setMinMax()
                this.maybeLoadImages()
            })
        }
    }

    D.addEventListener(`${M}:init`, ({detail}) => instance.init(detail))

})('ourTeam', 4, window, document)
