export default q => {
    /**
     * Slow scrollTo #anchor
     */
    try {
        const target = document.querySelector(q)
        const adminbar = document.getElementById('wpadminbar')
        const masthead = document.getElementById('masthead')
        if (!target) return
        let y = target.getBoundingClientRect().top + window.scrollY
        if (masthead) y -= masthead.clientHeight
        if (adminbar) y -= adminbar.clientHeight
        window.scroll({
            top: y,
            behavior: 'smooth'
        })
    } catch (e) {
        console.error(e)
    }
}
