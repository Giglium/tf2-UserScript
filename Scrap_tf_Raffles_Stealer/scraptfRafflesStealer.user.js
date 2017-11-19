// ==UserScript==
// @name         Scrap.tf Raffles Stealer
// @namespace    https://github.com/Giglium/tf2-UserScript
// @version      0.9
// @description  Enter in all Scrap.tf Raffles
// @author       Giglium
// @match        https://scrap.tf/raffles*
// @icon         https://scrap.tf/favicon-32x32.png?v=4
// @noframes
// @run-at       document-idle
// @grant        none
// @license      MIT Licens
// @updateURL
// @downloadURL
// @supportURL   https://github.com/Giglium/tf2-UserScript/issues
// ==/UserScript==

function checkRaffle( attemps ){
    if( attemps ){
        var raffles = document.getElementsByClassName( 'panel-raffle' );
        for( var i = 0; i < raffles.length; ++i ){
            if( !raffles[ i ].getAttribute( 'style' ) ) {
                window.location.href = 'https://scrap.tf' + $( 'a', raffles[ i ] ).attr( 'href' );
                return;
            }
        }
        ScrapTF.Raffles.Pagination.LoadNext();
        setTimeout( function() { checkRaffle( --attemps ); }, 7000);
    }
    return;
}

(function() {
    'use strict';

    if( document.getElementById('recaptcha-token') ){
            return;
        }

    var div = document.createElement('div');
    div.className = 'alert alert-info';
    div.setAttribute( 'style', 'position:fixed;bottom:0;right:0;z-index:999999;' );
    document.getElementsByTagName( 'body' )[0].appendChild( div );
    div.innerHTML = 'Checking for Raffles';

    var raffle = document.getElementsByClassName( 'btn btn-embossed btn-danger btn-lg' );
    if( raffle.length ){
        window.location.href = 'https://scrap.tf/raffles';
        return;
    }

    raffle = document.getElementsByClassName( 'btn btn-embossed btn-info btn-lg' );
    if( raffle.length ){
        var RefreshDate = new Date( new Date().getTime() + Math.round( Math.random() * ( 20000 - 10000 ) + 10000 ) );

        var countdown = setInterval(function() {
            var distance = RefreshDate - new Date(),
                seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000);

            div.innerHTML = 'I\'ll enter in the raffle in: ' + seconds + 's ';

            if ( distance < 0 ) {
                clearInterval( countdown );
                div.innerHTML = 'I am entering in the Raffle';
                raffle[0].click();
            }
        }, 1000);
    }
    else{
        checkRaffle( 5 );
    }
})();
