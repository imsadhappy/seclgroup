/**
 * Play & Pause videos
 */
export default () => {
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get() {
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    })
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('suspend', () => {
            if (!video.playing) video.play()
        })
        window.addEventListener('scroll', () => {
            if (!video.playing) video.play()
        })
    })
}
