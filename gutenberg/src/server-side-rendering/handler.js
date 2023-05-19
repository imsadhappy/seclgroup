console.log('test from server side rendering block');

document.querySelectorAll('.mx-ssr-block-wrapper').forEach( element => {
    element.innerHTML = 'This text from handler.js file!'
} );

