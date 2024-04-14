import slowScrollToTarget from "./slow-scroll-to-target"

export default click => {
    let url = null
    if (click.target.href) {
        url = new URL(click.target.href)
    } else if (click.target.parentElement?.href) {
        url = new URL(click.target.parentElement.href)
    }
    if (!url) return
    if (url.href.endsWith('#')) {
        click.preventDefault()
        return
    }
    if (url.hash != ''
        && url.pathname === location.pathname
        && url.hostname === location.hostname) {
            click.preventDefault()
            slowScrollToTarget(url.hash)
    }
}
