/**
 * Ajax Contact Form 7 Popup
 */
document.addEventListener('click', event => {
    const x = 'wpcf7-popup--';
    const closePopup = () => document.body.classList.remove(`${x}shown`)
    const createPopup = (html, buttonText) => {
        let overlay = document.createElement('a')
        overlay.addEventListener('click', closePopup)
        overlay.classList.add(`${x}overlay`)
        let close = document.createElement('a')
        close.addEventListener('click', closePopup)
        close.classList.add(`${x}close`)
        let content = document.createElement('div')
        content.classList.add(`${x}content`)
        content.innerHTML = html
        content.querySelectorAll('.js-replace-by-button-text')
                .forEach(node => node.innerText = buttonText)
        content.querySelectorAll(`.${x}close`)
                .forEach(node => node.addEventListener('click', closePopup))
        content.appendChild(close)
        return {overlay, content}
    }
    if (event.target.rel && event.target.rel.indexOf(x) === 0){
        event.preventDefault();
        if (typeof window.wpcf7 !== 'object') return;
        var formId = event.target.rel.replace(x, ''),
            popup = document.getElementById(x+formId),
            buttonText = event.target.textContent;
        if (popup) {
            document.body.classList.add(`${x}shown`);
        } else {
            var request = new XMLHttpRequest(),
                q = new URLSearchParams({
                    'action': 'wpcf7_popup',
                    'form_id': formId
                }).toString();
            request.onreadystatechange = function() {
                let requestResult = this
                if (requestResult.readyState !== 4 || requestResult.status !== 200) {
                    return;
                } else {
                    if (requestResult.responseText != '') {
                        popup = document.createElement('div')
                        popup.setAttribute('id', x+formId)
                        popup.classList.add(`${x}container`)
                        let {overlay, content} = createPopup(requestResult.responseText, buttonText)
                        popup.appendChild(overlay)
                        popup.appendChild(content)
                        document.body.appendChild(popup)
                        wpcf7.init(popup.querySelector('form'))
                        setTimeout(() => {
                            document.body.classList.add(`${x}shown`)
                        }, 100)
                    }
                }
            }
            request.open('GET', ajaxurl+'?'+q);
            request.send();
        }
    }
} );
