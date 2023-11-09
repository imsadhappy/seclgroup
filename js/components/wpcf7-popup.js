/**
 * Ajax Contact Form 7 Popup
 */
document.addEventListener('click', event => {
    const x = 'wpcf7-popup--';
    if (event.target.rel && event.target.rel.indexOf(x) === 0){
        event.preventDefault();
        if (typeof window.wpcf7 !== 'object') return;
        var formId = event.target.rel.replace(x, ''),
            popup = document.getElementById(x+formId);
        if (popup) {
            document.body.classList.add(x+'shown');
        } else {
            var request = new XMLHttpRequest(),
                q = new URLSearchParams({
                    'action': 'wpcf7_popup',
                    'form_id': formId
                }).toString();
            request.onreadystatechange = function() {
                if (this.readyState !== 4 || this.status !== 200) {
                    return;
                } else {
                    if (this.responseText != '') {
                        popup = document.createElement('div');
                        popup.setAttribute('id', x+formId);
                        popup.classList.add(x+'container');
                        var content = document.createElement('div'),
                            overlay = document.createElement('a'),
                            close = document.createElement('a');
                        overlay.addEventListener('click', () => document.body.classList.remove(x+'shown'));
                        close.addEventListener('click', () => document.body.classList.remove(x+'shown'));
                        content.classList.add(x+'content');
                        overlay.classList.add(x+'overlay');
                        close.classList.add(x+'close');
                        content.innerHTML = this.responseText;
                        popup.appendChild(overlay);
                        content.appendChild(close);
                        popup.appendChild(content);
                        document.body.appendChild(popup);
                        wpcf7.init(popup.querySelector('form'));
                        setTimeout(() => {
                            document.body.classList.add(x+'shown');
                        }, 100);
                    }
                }
            }
            request.open('GET', ajaxurl+'?'+q);
            request.send();
        }
    }
} );
