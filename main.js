(()=>{var e={108:(e,t,n)=>{var c=n(399),o=n(309);function s(){return(new Date).getTime()}var r,a=Array.prototype.slice,l={};r=void 0!==n.g&&n.g.console?n.g.console:"undefined"!=typeof window&&window.console?window.console:{};for(var d=[[function(){},"log"],[function(){r.log.apply(r,arguments)},"info"],[function(){r.log.apply(r,arguments)},"warn"],[function(){r.warn.apply(r,arguments)},"error"],[function(e){l[e]=s()},"time"],[function(e){var t=l[e];if(!t)throw new Error("No such label: "+e);delete l[e];var n=s()-t;r.log(e+": "+n+"ms")},"timeEnd"],[function(){var e=new Error;e.name="Trace",e.message=c.format.apply(null,arguments),r.error(e.stack)},"trace"],[function(e){r.log(c.inspect(e)+"\n")},"dir"],[function(e){if(!e){var t=a.call(arguments,1);o.ok(!1,c.format.apply(null,t))}},"assert"]],i=0;i<d.length;i++){var u=d[i],m=u[0],p=u[1];r[p]||(r[p]=m)}e.exports=r},309:()=>{},399:()=>{}},t={};function n(c){var o=t[c];if(void 0!==o)return o.exports;var s=t[c]={exports:{}};return e[c](s,s.exports,n),s.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{"use strict";const e=new Map,t=(n,c)=>{const o=n,s=c;let r;const a=[[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]],l=()=>r,d=e=>{r=r||e},i=()=>a.map((e=>u(e[0],e[1]))).filter((e=>void 0!==e)),u=(e,n)=>{const[c,r]=[o+e,s+n];if(0<=c&&c<8&&0<=r&&r<8)return t(c,r)},m=()=>`[${n}, ${c}]`;if(e.has(m()))return e.get(m());{let t={name:m,getPredecessor:l,setPredecessor:d,getMoves:i};return e.set(m(),t),t}},c=(n,c)=>{e.clear();const o=t(...n),s=t(...c),r=[o];for(;!r.includes(s);){const e=r.shift(),t=e.getMoves();t.forEach((t=>t.setPredecessor(e))),r.push(...t)}const a=[s];for(;!a.includes(o);){const e=a[0].getPredecessor();a.unshift(e)}return console.log(`The shortest path is ${a.length-1} moves!`),console.log("The moves are:"),a.forEach((e=>{console.log(e.name())})),a.map((e=>e.name()))};n(108);const o=(e,t)=>{const n=document.querySelector(".place"),c=document.querySelector(".end");if(n.classList.contains("active")||"knight"===t){const t=document.querySelector(".placedKnight");t&&t.parentElement.removeChild(t),e.textContent="";const n=document.createElement("img");n.classList.add("placedIcon"),n.classList.add("placedKnight"),n.src="./resources/knight.svg",e.appendChild(n)}if(c.classList.contains("active")||"end"===t){const t=document.querySelector(".placedEnd");t&&t.parentElement.removeChild(t),e.textContent="";const n=document.createElement("img");n.classList.add("placedIcon"),n.classList.add("placedEnd"),n.src="./resources/rook.png",e.appendChild(n)}},s=()=>{const e=document.querySelector(".place"),t=document.querySelector(".end");e.classList.remove("active"),t.classList.remove("active")},r=(e,t)=>{const n=e.parentElement,o=t.parentElement,s=parseInt(n.dataset.x),r=parseInt(n.dataset.y),l=parseInt(o.dataset.x),d=parseInt(o.dataset.y);c([s,r],[l,d]),a(c([s,r],[l,d]))},a=e=>{for(let t=1;t<e.length;t++){const n=e[t],c=n[1],o=n[4],s=document.querySelector(`[data-x="${c}"][data-y="${o}"]`),r=document.createElement("img");r.classList.add("placedIcon"),r.classList.add("placedKnight"),r.src="./resources/knight.svg",setTimeout((function(){const e=document.querySelector(".placedKnight");e&&e.parentElement.removeChild(e),s.appendChild(r)}),1e3*t)}};!function(){const e=document.querySelector(".board");for(let t=0;t<8;t++){let n=document.createElement("div");for(let e=0;e<8;e++){let c=document.createElement("div");t%2==0?e%2==0?c.classList.add("white"):c.classList.add("black"):e%2==0?c.classList.add("black"):c.classList.add("white"),c.dataset.originalColor=c.classList,c.classList.add("cell"),c.dataset.row=t,c.dataset.column=e,c.dataset.x=e,c.dataset.y=7-t,n.appendChild(c)}n.classList.add("row"),e.appendChild(n)}}(),(()=>{const e=document.querySelector(".place"),t=document.querySelector(".end"),n=document.querySelector(".placeR"),c=document.querySelector(".endR"),a=document.querySelector(".go"),l=document.querySelector(".reset");e.addEventListener("click",(()=>{e.classList.remove("active"),t.classList.remove("active"),e.classList.add("active")})),t.addEventListener("click",(()=>{e.classList.remove("active"),t.classList.remove("active"),t.classList.add("active")})),n.addEventListener("click",(()=>{s();const e=Math.floor(8*Math.random()),t=Math.floor(8*Math.random()),n=document.querySelector(".board").children.item(e).children.item(t);o(n,"knight")})),c.addEventListener("click",(()=>{s();const e=Math.floor(8*Math.random()),t=Math.floor(8*Math.random()),n=document.querySelector(".board").children.item(e).children.item(t);n.firstChild||o(n,"end")})),a.addEventListener("click",(()=>{s();const e=document.querySelector(".placedKnight"),t=document.querySelector(".placedEnd"),n=document.querySelector(".info");e&&t?(n.textContent="",r(e,t)):n.textContent="Please place both a knight and a castle."})),l.addEventListener("click",(()=>{s(),document.querySelectorAll(".cell").forEach((e=>{e.textContent=""}))}))})(),document.querySelectorAll(".cell").forEach((e=>{e.addEventListener("mouseenter",(()=>{e.firstChild||(e=>{const t=document.querySelector(".place"),n=document.querySelector(".end");if(t.classList.contains("active")){const t=document.createElement("img");t.classList.add("hoverIcon"),t.src="./resources/knight.svg",e.appendChild(t)}if(n.classList.contains("active")){const t=document.createElement("img");t.classList.add("hoverIcon"),t.src="./resources/rook.png",e.appendChild(t)}})(e)})),e.addEventListener("mouseleave",(()=>{e.firstChild&&e.firstChild.classList.contains("placedIcon")||(e.textContent="")})),e.addEventListener("click",(()=>{o(e)}))}))})()})();