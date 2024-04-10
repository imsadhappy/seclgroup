/**
 * Video Lazy Loading
 */

if ('IntersectionObserver' in window) {
    const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
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
    document.querySelectorAll('video.lazy').forEach(video => {
        lazyVideoObserver.observe(video)
    })
}

