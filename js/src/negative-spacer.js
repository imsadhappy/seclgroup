/**
 * Negative Spacer Block
 */
export default () => {
    document.querySelectorAll('.wp-block-spacer.negative').forEach(spacer => {
        let s = window.getComputedStyle(spacer, null),
            h = parseInt(s.height, 10) * 2;
        spacer.style.marginTop = `-${h}px`;
    })
}
