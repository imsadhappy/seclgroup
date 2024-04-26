export default () => {
    /**
     * Scroll ratio for zoomed screens
     */
    let i = 1
    if (window.devicePixelRatio < 1) i++
    if (window.devicePixelRatio < .35) i++
    if (window.devicePixelRatio <= .25) i++
    window.scrollRatio = i
}
