(()=>{"use strict";const e=new Map,t=(n,s)=>{const c=n,o=s;let a;const r=[[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]],d=()=>a,l=e=>{a=a||e},i=()=>r.map((e=>u(e[0],e[1]))).filter((e=>void 0!==e)),u=(e,n)=>{const[s,a]=[c+e,o+n];if(0<=s&&s<8&&0<=a&&a<8)return t(s,a)},m=()=>`[${n}, ${s}]`;if(e.has(m()))return e.get(m());{let t={name:m,getPredecessor:d,setPredecessor:l,getMoves:i};return e.set(m(),t),t}},n=(n,s)=>{e.clear();const c=t(...n),o=t(...s),a=[c];for(;!a.includes(o);){const e=a.shift(),t=e.getMoves();t.forEach((t=>t.setPredecessor(e))),a.push(...t)}const r=[o];for(;!r.includes(c);){const e=r[0].getPredecessor();r.unshift(e)}return console.log(`The shortest path is ${r.length-1} moves!`),console.log("The moves are:"),r.forEach((e=>{console.log(e.name())})),r.map((e=>e.name()))},s=(e,t)=>{const n=document.querySelector(".place"),s=document.querySelector(".end");if(n.classList.contains("active")||"knight"===t){const t=document.querySelector(".placedKnight");t&&t.parentElement.removeChild(t),e.textContent="";const n=document.createElement("img");n.classList.add("placedIcon"),n.classList.add("placedKnight"),n.src="./resources/knight.svg",e.appendChild(n)}if(s.classList.contains("active")||"end"===t){const t=document.querySelector(".placedEnd");t&&t.parentElement.removeChild(t),e.textContent="";const n=document.createElement("img");n.classList.add("placedIcon"),n.classList.add("placedEnd"),n.src="./resources/rook.png",e.appendChild(n)}},c=()=>{const e=document.querySelector(".place"),t=document.querySelector(".end");e.classList.remove("active"),t.classList.remove("active")},o=(e,t)=>{const s=e.parentElement,c=t.parentElement,o=parseInt(s.dataset.x),r=parseInt(s.dataset.y),i=parseInt(c.dataset.x),u=parseInt(c.dataset.y),m=n([o,r],[i,u]);n([o,r],[i,u]),a(m);const h=d(m);l(h)},a=e=>{const t=document.querySelector(".placedKnight");t.parentElement.classList.add("visited"),r(t,e[0],e[1]);for(let t=1;t<e.length;t++){const n=e[t],s=n[1],c=n[4],o=document.querySelector(`[data-x="${s}"][data-y="${c}"]`),a=document.createElement("img");a.classList.add("placedIcon"),a.classList.add("placedKnight"),a.src="./resources/knight.svg",setTimeout((function(){const s=document.querySelector(".placedKnight");s&&s.parentElement.removeChild(s),o.appendChild(a),r(a,n,e[t+1]),o.classList.add("visited")}),1e3*t)}},r=(e,t,n)=>{if(!n)return;const s=t[1],c=t[4],o=n[1],a=n[4],r=parseInt(o)-parseInt(s),d=parseInt(a)-parseInt(c);2===r&&1===d&&(e.style.animation="uOneRTwo 1s forwards"),2===r&&-1===d&&(e.style.animation="dOneRTwo 1s forwards"),1===r&&2===d&&(e.style.animation="uTwoROne 1s forwards"),1===r&&-2===d&&(e.style.animation="dTwoROne 1s forwards"),-1===r&&2===d&&(e.style.animation="uTwoLOne 1s forwards"),-1===r&&-2===d&&(e.style.animation="dTwoLOne 1s forwards"),-2===r&&1===d&&(e.style.animation="uOneLTwo 1s forwards"),-2===r&&-1===d&&(e.style.animation="dOneLTwo 1s forwards")},d=e=>{let t=[];return e.forEach((e=>{let n=parseInt(e.charAt(1));const s=parseInt(e.charAt(4));e=`${i(n)}${s+1}`,t.push(e)})),t},l=e=>{const t=document.querySelector(".info"),n=document.querySelector(".infoSub");n.textContent="The moves are:",t.textContent=`The shortest path is ${e.length-1} moves long!`,e.forEach((e=>{n.textContent=n.textContent+` ${e}`}))},i=e=>0===e?"A":1===e?"B":2===e?"C":3===e?"D":4===e?"E":5===e?"F":6===e?"G":"H";!function(){const e=document.querySelector(".board");for(let t=0;t<8;t++){let n=document.createElement("div");for(let e=0;e<8;e++){let s=document.createElement("div");t%2==0?e%2==0?s.classList.add("white"):s.classList.add("black"):e%2==0?s.classList.add("black"):s.classList.add("white"),s.dataset.originalColor=s.classList,s.classList.add("cell"),s.dataset.row=t,s.dataset.column=e,s.dataset.x=e,s.dataset.y=7-t,n.appendChild(s)}n.classList.add("row"),e.appendChild(n)}}(),(()=>{const e=document.querySelector(".place"),t=document.querySelector(".end"),n=document.querySelector(".placeR"),a=document.querySelector(".endR"),r=document.querySelector(".go"),d=document.querySelector(".reset");e.addEventListener("click",(()=>{e.classList.remove("active"),t.classList.remove("active"),e.classList.add("active")})),t.addEventListener("click",(()=>{e.classList.remove("active"),t.classList.remove("active"),t.classList.add("active")})),n.addEventListener("click",(()=>{c();const e=Math.floor(8*Math.random()),t=Math.floor(8*Math.random()),n=document.querySelector(".board").children.item(e).children.item(t);s(n,"knight")})),a.addEventListener("click",(()=>{c();const e=Math.floor(8*Math.random()),t=Math.floor(8*Math.random()),n=document.querySelector(".board").children.item(e).children.item(t);n.firstChild||s(n,"end")})),r.addEventListener("click",(()=>{c();const e=document.querySelector(".placedKnight"),t=document.querySelector(".placedEnd"),n=document.querySelector(".info");e&&t?(n.textContent="",document.querySelectorAll(".cell").forEach((e=>{e.classList.remove("visited")})),o(e,t)):n.textContent="Please place both a knight and a castle."})),d.addEventListener("click",(()=>{c();const e=document.querySelectorAll(".cell"),t=document.querySelector(".info"),n=document.querySelector(".infoSub");t.textContent="",n.textContent="",e.forEach((e=>{e.textContent="",e.classList.remove("visited")}))}))})(),document.querySelectorAll(".cell").forEach((e=>{e.addEventListener("mouseenter",(()=>{e.firstChild||(e=>{const t=document.querySelector(".place"),n=document.querySelector(".end");if(t.classList.contains("active")){const t=document.createElement("img");t.classList.add("hoverIcon"),t.src="./resources/knight.svg",e.appendChild(t)}if(n.classList.contains("active")){const t=document.createElement("img");t.classList.add("hoverIcon"),t.src="./resources/rook.png",e.appendChild(t)}})(e)})),e.addEventListener("mouseleave",(()=>{e.firstChild&&e.firstChild.classList.contains("placedIcon")||(e.textContent="")})),e.addEventListener("click",(()=>{s(e)}))}))})();