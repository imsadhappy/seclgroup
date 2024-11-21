/**
 * Ajax Contact Form 7 Popup
 */
window.wpcf7ShowPopup = window.wpcf7ShowPopup || function (x, button) {

    const formId = button?.rel?.replace(x, '')

    if (!formId) return

    let popup = document.getElementById(x+formId)

    if (button.classList.contains('loading')) return

    if (popup) {
        button.classList.remove('is-clicked')
        document.body.classList.add(`${x}shown`)
        return
    }

    button.classList.add('loading')
    
    const closePopup = () => document.body.classList.remove(`${x}shown`)

    const createPopup = (html, buttonText) => {
        const overlay = document.createElement('a')
        overlay.addEventListener('click', closePopup)
        overlay.classList.add(`${x}overlay`)
        overlay.href = '#'
        const close = document.createElement('a')
        close.href = '#'
        close.addEventListener('click', closePopup)
        close.classList.add(`${x}close`)
        const content = document.createElement('div')
        content.classList.add(`${x}content`)
        content.innerHTML = html
        content.querySelector('[name="ref_url"]').setAttribute('value', window.location.href)
        content.querySelectorAll('.js-replace-by-button-text')
                .forEach(node => node.innerText = buttonText)
        content.querySelectorAll(`.${x}close`)
                .forEach(node => node.addEventListener('click', closePopup))
        content.appendChild(close)
        return {overlay, content}
    }

    const attachPopup = html => {
        popup = document.createElement('div')
        popup.setAttribute('id', x+formId)
        popup.classList.add(`${x}container`)
        let {overlay, content} = createPopup(html, button.textContent)
        popup.appendChild(overlay)
        popup.appendChild(content)
        document.body.appendChild(popup)
        if (typeof window.wpcf7?.init === 'function') {
            window.wpcf7.init(popup.querySelector('form'))
        }
        setTimeout(() => {
            button.classList.remove('loading', 'is-clicked')
            document.body.classList.add(`${x}shown`)
        }, 333)
        return popup
    }
    
    const request = new XMLHttpRequest()

    request.onreadystatechange = function() {
        let requestResult = this
        if (requestResult.readyState !== 4 || requestResult.status !== 200) {
            return
        }
        if (requestResult.responseText != '' && typeof window.wpcf7 === 'object') {
            popup = attachPopup(requestResult.responseText)
        }
    }

    request.open('GET', ajaxurl+'?'+(new URLSearchParams({
        'action': 'wpcf7_popup',
        'form_id': formId
    }).toString()))

    request.send()
}

export default buttonClick => {
    const x = 'wpcf7-popup--'
    if (buttonClick?.target?.rel?.indexOf(x) >= 0) {
        buttonClick.preventDefault()
        window.wpcf7ShowPopup(x, buttonClick.target)
    }
}
