(()=>{"use strict";var e,t={697:()=>{const e=window.wp.blocks,t=JSON.parse('{"u2":"mxltcs/nested-blocks-child-blocks-block-one","TN":"Block One","WL":"Add Block One"}'),r=window.wp.element,s=window.wp.i18n,n=window.wp.blockEditor,o=window.wp.components;(0,e.registerBlockType)(t.u2,{edit:function({attributes:e,isSelected:l,setAttributes:a}){const i=(0,n.useBlockProps)();return(0,r.createElement)("div",i,e.message&&!l?(0,r.createElement)(r.Fragment,null):(0,r.createElement)(o.Placeholder,{label:t.TN,instructions:t.WL},(0,r.createElement)(o.TextControl,{label:(0,s.__)("Message","mxltcs-domain"),value:e.message,onChange:e=>a({message:e})})),e.message?(0,r.createElement)("div",{"data-number":e.number,"data-size":e.size},e.message):(0,r.createElement)("div",null,"No Message"))},save:function({attributes:e}){const t=n.useBlockProps.save();return(0,r.createElement)("div",t,e.message)}})}},r={};function s(e){var n=r[e];if(void 0!==n)return n.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,s),o.exports}s.m=t,e=[],s.O=(t,r,n,o)=>{if(!r){var l=1/0;for(u=0;u<e.length;u++){for(var[r,n,o]=e[u],a=!0,i=0;i<r.length;i++)(!1&o||l>=o)&&Object.keys(s.O).every((e=>s.O[e](r[i])))?r.splice(i--,1):(a=!1,o<l&&(l=o));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,n,o]},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={586:0,846:0};s.O.j=t=>0===e[t];var t=(t,r)=>{var n,o,[l,a,i]=r,c=0;if(l.some((t=>0!==e[t]))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(i)var u=i(s)}for(t&&t(r);c<l.length;c++)o=l[c],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(u)},r=globalThis.webpackChunkseclgroup=globalThis.webpackChunkseclgroup||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=s.O(void 0,[846],(()=>s(697)));n=s.O(n)})();