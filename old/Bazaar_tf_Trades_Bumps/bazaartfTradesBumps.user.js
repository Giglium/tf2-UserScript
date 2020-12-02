// ==UserScript==
// @name         Bazaar.tf Trades Bumps
// @namespace    https://github.com/Giglium/tf2-UserScript
// @version      1.0.2
// @description  Bump trades on bazaar.tf
// @author       Giglium
// @include      /^https?:\/\/.*\.?bazaar\.tf\.*/
// @icon         http://bazaar.tf/ico/favicon.ico
// @noframes
// @run-at       document-end
// @grant        none
// @license      MIT Licens
// @updateURL    https://raw.githubusercontent.com/Giglium/tf2-UserScript/master/Bazaar_tf_Trades_Bumps/bazaartfTradesBumps.meta.js
// @downloadURL  https://github.com/Giglium/tf2-UserScript/blob/master/Bazaar_tf_Trades_Bumps/bazaartfTradesBumps.user.js
// @supportURL   https://github.com/Giglium/tf2-UserScript/issues
// ==/UserScript==

(function() {
    'use strict';

    /* SETTINGS */
    var maxRefreshTime = 60 * 60000,
        minRefreshTime = 30 * 60000;
    /* END OF SETTINGS */

    var div = document.createElement('div');
    div.className = 'alert alert-info';
    div.setAttribute( 'style', 'position:fixed;bottom:0;right:0;' );
    document.getElementsByTagName( 'body' )[0].appendChild( div );
    div.innerHTML = 'Bumping items';

    var RefreshDate = new Date( new Date().getTime() + Math.round( Math.random() * ( maxRefreshTime - minRefreshTime ) + minRefreshTime ) );

    var countdown = setInterval(function() {
        var distance = RefreshDate - new Date(),
            hours = Math.floor( ( distance % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) ),
            minutes = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) ),
            seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );

        div.innerHTML = 'Next bumps: ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        if ( distance < 0 ) {
            clearInterval( countdown );
            div.innerHTML = 'Loading...';
            location.reload();
        }
}, 1000);
})();
