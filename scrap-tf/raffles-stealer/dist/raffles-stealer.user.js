// ==UserScript==
// @name raffles-stealer
// @version 1.0.0
// @author Giglium
// @description Slowly and gently enter in all Scrap.tf Raffles.
// @homepage https://github.com/Giglium/tf2-UserScript/tree/master/scrap-tf/raffles-stealer
// @supportURL https://github.com/Giglium/tf2-UserScript/issues
// @namespace https://github.com/Giglium/tf2-UserScript/tree/master/scrap-tf/raffles-stealer
// @icon https://scrap.tf/favicon-32x32.png?v=4
// @run-at document-idle
// @grant none
// @noframes 
// @include /^https?:\/\/scrap\.tf\/raffles*/
// @downloadURL https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/raffles-stealer/dist/raffles-stealer.user.js
// @updateURL https://github.com/Giglium/tf2-UserScript/raw/master/scrap-tf/raffles-stealer/dist/raffles-stealer.meta.js
// ==/UserScript==

(()=>{function e(){return{ENTERED_RAFFLE:"raffle-entered",ATTEMPTS:5,BASE_SITE:"https://scrap.tf",RAFFLES_HOMEPAGE:this.BASE_SITE+"/raffles"}}function t(){return 1e4*Math.random()+1e4}function n(e){e.getElementsByTagName("A")[0].click()}function a(){window.location.href=e().RAFFLES_HOMEPAGE}function r(){var t,n=document.querySelectorAll(".panel.panel-info");return 0===n.length?[]:(t=n.length>1?n[1]:n[0],Array.from(t.querySelectorAll(".panel-raffle")).filter((function(t){return!t.classList.contains(e().ENTERED_RAFFLE)})))}function o(e){if(0!==e){var l=r();0===l.length?(ScrapTF.Raffles.Pagination.LoadNext(),setTimeout((function(){o(--e)}),t()*(1-e))):n(l[0])}else a()}!function(){"use strict";if(!document.getElementById("recaptcha-token")){var l=document.createElement("div");l.className="alert alert-info",l.setAttribute("style","position:fixed;bottom:0;right:0;z-index:999999;"),document.getElementsByTagName("body")[0].appendChild(l),l.textContent="Checking for new Raffles";var i=r();if(0===i.length){var f=document.querySelector(".btn.btn-embossed.btn-info.btn-lg");if(null!=f)var c=new Date((new Date).getTime()+Math.round(t())),s=setInterval((function(){var e=c-new Date,n=Math.floor(e%6e4/1e3);l.textContent='I"ll enter in the raffle in: '+n+"s ",e<0&&(clearInterval(s),l.textContent="I am entering in the Raffle",f.click(),n=Math.floor(t()%6e4/1e3),l.textContent="Wait "+n+" seconds before continue...",setInterval((function(){a()}),t()))}),1e3);else l.textContent="Checking for new raffles, please wait...",o(e().ATTEMPTS)}else n(i[0])}}()})();