// ==UserScript==
// @name raffles-stealer
// @version 1.0.0
// @author Giglium
// @description Slowly and gently enter in all Scrap.tf Raffles.
// @homepage https://github.com/Giglium/tf2-UserScript/tree/master/Scrap_tf_Raffles_Stealer
// @supportURL https://github.com/Giglium/tf2-UserScript/issues
// @namespace https://github.com/Giglium/tf2-UserScript/tree/master/Scrap_tf_Raffles_Stealer
// @icon https://scrap.tf/favicon-32x32.png?v=4
// @run-at document-idle
// @grant none
// @noframes 
// @include /^https?:\/\/scrap\.tf\/raffles*/
// @downloadURL https://github.com/Giglium/tf2-UserScript/raw/master/Scrap_tf_Raffles_Stealer/raffles-stealer.user.js
// @updateURL https://github.com/Giglium/tf2-UserScript/raw/master/Scrap_tf_Raffles_Stealer/raffles-stealer.meta.js
// ==/UserScript==

(()=>{function e(){return{ENTERED_RAFFLE:"raffle-entered",ATTEMPTS:5,BASE_SITE:"https://scrap.tf",RAFFLES_HOMEPAGE:this.BASE_SITE+"/raffles"}}function n(e){if(0!==e){var l=t();0===l.length?(ScrapTF.Raffles.Pagination.LoadNext(),setTimeout((function(){n(--e)}),i()*(1-e))):a(l[0])}else r()}function t(){var n,t=document.querySelectorAll(".panel.panel-info");return 0===t.length?[]:(n=t.length>1?t[1]:t[0],Array.from(n.querySelectorAll(".panel-raffle")).filter((function(n){return!n.classList.contains(e().ENTERED_RAFFLE)})))}function r(){window.location.href=e().RAFFLES_HOMEPAGE}function a(e){e.getElementsByTagName("A")[0].click()}function i(){return 1e4*Math.random()+1e4}!function(){"use strict";if(!document.getElementById("recaptcha-token")){console.log("test");var l=document.createElement("div");l.className="alert alert-info",l.setAttribute("style","position:fixed;bottom:0;right:0;z-index:999999;"),document.getElementsByTagName("body")[0].appendChild(l),l.innerHTML="Checking for new Raffles";var o=t();if(0===o.length){var f=document.querySelector(".btn.btn-embossed.btn-info.btn-lg");if(null!=f)var c=new Date((new Date).getTime()+Math.round(i())),s=setInterval((function(){var e=c-new Date,n=Math.floor(e%6e4/1e3);l.innerHTML="I'll enter in the raffle in: "+n+"s ",e<0&&(clearInterval(s),l.innerHTML="I am entering in the Raffle",f.click(),n=Math.floor(i()%6e4/1e3),l.innerHTML="Wait "+n+" seconds before continue...",setInterval((function(){r()}),i()))}),1e3);else l.innerHTML="Checking for new raffles, please wait...",n(e().ATTEMPTS)}else a(o[0])}}()})();