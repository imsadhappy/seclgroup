((deleteCookie, setFooterOffset) => {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.cookie.indexOf('cookie_notice_accepted=true') < 0) {
            localStorage.clear()
            sessionStorage.clear()
            document.cookie.split(';').forEach(cookie => {
                let name = cookie.split('=')[0].trim(),
                    path = window.location.pathname.replace(/\/$/, ""),
                    domains = window.location.hostname.split('.')
                if (name === 'cookie_notice_accepted') return
                while (domains.length > 1) {
                    deleteCookie(name, path, domains.join('.'))
                    domains.shift()
                }
            })
        }
        setFooterOffset()
    })
    window.addEventListener('resize', setFooterOffset)
})((name, path, domain) => {
    [`.${domain}`, `${domain}`, ''].forEach(d => {
        [`${path}`, '/', ''].forEach(p => {
            let c = `${name}=;path=${p};max-age=-1;domain=${d};`
            document.cookie = c; document.cookie = `${c};secure`
        })
    })
}, () => {
    setTimeout(() => {
        const target = document.querySelector('body.cookies-not-set #colophon'),
            notice = document.getElementById('cookie-notice')
        if (target && notice) {
            target.style.paddingBottom = `${notice.clientHeight}px`
        }
    }, 1000)
})
