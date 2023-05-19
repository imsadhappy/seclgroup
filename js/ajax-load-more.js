/**
 * AJAX load more
 */
document.addEventListener('click', function(event){
    var button = false;
    if (event.target.classList.contains('ajax-load-more')) {
        button = event.target;
    } else if (event.target.parentNode.classList.contains('ajax-load-more')) {
        button = event.target.parentNode;
    } else {
        return;
    }
    if (button.classList.contains('none') || button.classList.contains('wait')) {
        return;
    } else {
        button.classList.add('wait');
        var list = button.previousElementSibling,
            request = new XMLHttpRequest(),
            q = new URLSearchParams({
                'action': 'load_more',
                'offset': button.dataset.offset,
                'cat': button.dataset.cat,
                'post_type': button.dataset.post_type
            }).toString();
        request.onreadystatechange = function(){
            if (this.readyState !== 4 || this.status !== 200) {
                return;
            } else {
                button.classList.remove('wait');
                if (this.responseText.length > 0) {
                    list.innerHTML = list.innerHTML + this.responseText;
                    button.dataset.offset = list.children.length;
                    document.dispatchEvent(new CustomEvent('AJAXDOMContentLoaded'));
                    window.dispatchEvent(new Event('resize'));
                } else {
                    button.classList.add('none');
                }
            }
        }
        request.open('GET', ajaxurl+'?'+q);
        request.send();
    }
});
document.addEventListener('AjaxCounted', function(event){
    var button = event.detail.target;
    if (button.classList.contains('ajax-load-more')) {
        if (parseInt(button.dataset.offset, 10) > event.detail.result){
            button.classList.add('none');
        }
    }
});
