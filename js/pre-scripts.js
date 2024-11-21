
if (window.location.hash) scroll(0,0);

!((ua) => document.body.classList.add('browser-' + (
	ua("Chrome") ? 'chrome' : 
	ua("Safari") ? 'safari' : 
	ua("Firefox") ? 'firefox' : 
	'unknown')
))((x) => navigator.userAgent.includes(x));

document.fonts.ready.then(() => document.body.classList.add('fonts-ready'));

!((x, y, z) => {
    let a, b = () => typeof x[y]?.execute === 'function';
    if (b()) return;
    let c = () => {
        if (b() && x[y+z]) {
            clearInterval(a);
            x[y+z].forEach(f => x[y].ready(f));
            x[y+z] = null;
        } else {
            x[y+z] = x[y+z] || [];
            x[y] = x[y] || { ready: f => x[y+z].push(f) };
        }
    };
    c();
    a = setInterval(c, 100);
})(window, 'grecaptcha', '_check');
