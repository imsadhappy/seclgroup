/**
 * Video Lazy Loading
 */
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get() {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

if ('IntersectionObserver' in window) {
    const lazyVideoObserver = new IntersectionObserver(entries => {
        entries.forEach(video => {
            if (video.isIntersecting) {
                for (var source in video.target.children) {
                var videoSource = video.target.children[source]
                if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                    videoSource.src = videoSource.dataset.src
                }
                }
                video.target.load()
                video.target.classList.remove('lazy')
                lazyVideoObserver.unobserve(video.target)
            }
        })
    })
    setTimeout(() => {
        document.querySelectorAll('video.lazy').forEach(video => {
            lazyVideoObserver.observe(video)
        })
    }, 999)
}

document.querySelectorAll('video').forEach(video => {
    video.addEventListener('suspend', () => {
        if (!video.playing) video.play()
    })
    window.addEventListener('scroll', () => {
        if (!video.playing) video.play()
    })
})
