((deleteCookie, setFooterOffset, loadCookieScripts) => {
    if (document.cookie.indexOf('cookie_notice_accepted=true') < 0) {
        document.addEventListener('DOMContentLoaded', () => {
            localStorage.clear()
            sessionStorage.clear()
            const path = window.location.pathname.replace(/\/$/, "")
            document.cookie.split(';').forEach(cookie => {
                let name = cookie.split('=')[0].trim(),
                    domains = window.location.hostname.split('.')
                if (name === 'cookie_notice_accepted') return
                while (domains.length > 1) {
                    deleteCookie(name, path, domains.join('.'))
                    domains.shift()
                }
            })
        })
    } else {
        loadCookieScripts()
    }
    document.addEventListener('DOMContentLoaded', () => setTimeout(setFooterOffset, 1000))
    window.addEventListener('resize', () => setTimeout(setFooterOffset, 1000))
    document.addEventListener('setCookieNotice', ({detail}) => {
        if (detail.value.toString() === 'true') loadCookieScripts()
    })
})( /* deleteCookie */ (name, path, domain) => {
    [`.${domain}`, `${domain}`, ''].forEach(d => {
        [`${path}`, '/', ''].forEach(p => {
            let c = `${name}=;path=${p};max-age=-1;domain=${d};`
            document.cookie = c; document.cookie = `${c};secure`
        })
    })
}, /* setFooterOffset */ () => {
    let target = document.querySelector('body.cookies-not-set #colophon'),
        notice = document.getElementById('cookie-notice')
    if (target && notice) {
        target.style.paddingBottom = `${notice.clientHeight}px`
    }
}, /* loadCookieScripts */ () => {
    document.querySelectorAll('[type="text/if-cookie-notice-accepted"]').forEach(x => {
        let s = document.createElement('script')
        s.innerHTML = x.innerHTML
        x.parentNode.insertBefore(s, x)
        x.outerHTML = ''
    })
})
