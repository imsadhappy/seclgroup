((deleteCookie, setFooterOffset, GAConsentGranted) => {
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
        GAConsentGranted()
    }
    document.addEventListener('DOMContentLoaded', setFooterOffset)
    window.addEventListener('resize', setFooterOffset)
    document.addEventListener('setCookieNotice', ({detail}) => {
        setFooterOffset()
        if (detail.value.toString() === 'true') GAConsentGranted()
    })
})( /* deleteCookie */ (name, path, domain) => {
    [`.${domain}`, `${domain}`, ''].forEach(d => {
        [`${path}`, '/', ''].forEach(p => {
            let c = `${name}=;path=${p};max-age=-1;domain=${d};`
            document.cookie = c; document.cookie = `${c};secure`
        })
    })
}, /* setFooterOffset */ () => {
    setTimeout(() => {
        let notice = document.getElementById('cookie-notice'),
            colophon = document.getElementById('colophon')
        if (colophon && notice) {
            colophon.style.paddingBottom = `${notice.clientHeight}px`
        }
    }, 1000)
}, /* GAConsentGranted */ () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });
    dataLayer.push({event: 'Consent Updated'});
})
