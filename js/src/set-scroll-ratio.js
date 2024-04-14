export default () => {
    /**
     * Scroll ratio for zoomed screens
     */
    let i = Math.ceil(window.devicePixelRatio)
    if (window.devicePixelRatio < 1) i = 2
    if (window.devicePixelRatio <= .5) i = 3
    if (window.devicePixelRatio <= .25) i = 4
    window.scrollRatio = i
}
