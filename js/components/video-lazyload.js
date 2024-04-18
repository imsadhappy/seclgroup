/**
 * Video Lazy Loading
 */
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get() {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

const lazyVideoObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(video => {
        if (video.isIntersecting) {
            for (let source in video.target.children) {
                let videoSource = video.target.children[source]
                if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                    videoSource.src = videoSource.dataset.src
                }
            }
            video.target.load()
            video.target.classList.remove('lazy')
            lazyVideoObserver.unobserve(video.target)
        }
    })
}) : {observe:() => {}}

setTimeout(() => {
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('suspend', () => {
            if (!video.playing) video.play()
        })
        window.addEventListener('scroll', () => {
            //if (!video.playing) video.play()
        })
        if (video.classList.contains('lazy')) {
            lazyVideoObserver.observe(video)
        }
    })
}, 111)
