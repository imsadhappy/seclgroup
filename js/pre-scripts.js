
if (window.location.hash) scroll(0,0);

!((ua) => document.body.classList.add('browser-' + (
	ua("Chrome") ? 'chrome' : 
	ua("Safari") ? 'safari' : 
	ua("Firefox") ? 'firefox' : 
	'unknown')
))((x) => navigator.userAgent.includes(x));

document.fonts.ready.then(() => document.body.classList.add('fonts-ready'));

!((x, y, z) => {
    let c = () => typeof x[y]?.execute === 'function';
    if (c()) return;
    let i = setInterval(() => {
        if (c() && x[y+z]) {
            clearInterval(i);
            x[y+z].forEach(f => x[y].ready(f));
            x[y+z] = null;
        } else {
            x[y+z] = x[y+z] || [];
            x[y] = x[y] || { ready: f => x[y+z].push(f) };
        }
    }, 100)
})(window, 'grecaptcha', '_check');
