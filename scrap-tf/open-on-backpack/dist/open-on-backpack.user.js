// ==UserScript==
// @name open-on-backpack
// @version 1.2.0
// @author Giglium
// @description Generate a link on all scrap.tf item for open them on backpack.tf
// @homepage https://github.com/Giglium/tf2-UserScript/tree/master/scrap-tf/open-on-backpack
// @supportURL https://github.com/Giglium/tf2-UserScript/issues
// @namespace https://github.com/Giglium/tf2-UserScript/tree/master/scrap-tf/open-on-backpack
// @icon https://scrap.tf/favicon-32x32.png?v=4
// @run-at document-end
// @grant none
// @noframes 
// @include /^https?:\/\/.*\.?scrap\.tf\/(auctions|weapons|hats|items|unusuals|skins|killstreaks|stranges|partswap|raffles).*/
// @downloadURL https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/open-on-backpack/dist/open-on-backpack.user.js
// @updateURL https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/open-on-backpack/dist/open-on-backpack.meta.js
// ==/UserScript==

(()=>{function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var e=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=this;this._index=t.dataset.defindex,this._name=t.dataset.title,this._isCraftable=t.classList.contains("uncraft"),t.classList.forEach((function(t){-1!==t.indexOf("quality")&&(a._quality=t)}))}var a,i;return a=e,(i=[{key:"name",get:function(){return this._name}},{key:"index",get:function(){return this._index}},{key:"isCraftable",get:function(){return this._isCraftable}},{key:"qualityNumber",get:function(){return parseInt(this._quality.replace(/^\D+/g,""),10)}},{key:"isSupportedByBackpack",get:function(){return-1===this._quality.indexOf("steamCard")&&-1===this._quality.indexOf("Emoticon")&&-1===this._quality.indexOf("Profile")}},{key:"backpackLink",get:function(){var t="";switch(this.qualityNumber){case 0:t=["https://csgo.backpack.tf/stats",encodeURIComponent(this._name.replace(/&apos;/g,"'"))].join("/");break;case 4:t=["https://backpack.tf/stats",this.qualityNumber,this._index,"Tradable",this.isCraftable?"Non-Craftable":"Craftable"].join("/");break;default:t=["https://backpack.tf/stats",this.qualityNumber,this._index,"Tradable",this.isCraftable?"Non-Craftable":"Craftable"].join("/")}return t}}])&&t(a.prototype,i),e}();!function(){"use strict";var t,a;t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style"),t.appendChild(a),a.appendChild(document.createTextNode(".bpLink{font-size: 12px; position: absolute; bottom: 2px; left: 2px;} .bpLink a{color: inherit;}.quality5:not(.app730) {border-color: #943282;border-bottom-color: #943282!important;border-right-color: #943282!important;color: #943282;}")),document.querySelectorAll(".item").forEach((function(t){var a=new e(t);if(a.isSupportedByBackpack){var i=document.createElement("div"),n=document.createElement("a"),r=document.createElement("i");i.className="bpLink",i.appendChild(n),n.appendChild(r),n.href=a.backpackLink,n.target="_blank",n.addEventListener("click",(function(t){t.stopImmediatePropagation()})),r.classList.add("fa"),r.classList.add("fa-external-link"),r.setAttribute("aria-hidden","true"),t.appendChild(i)}}))}()})();