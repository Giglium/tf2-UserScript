// ==UserScript==
// @name         Backpack.tf Classifieds Bumps
// @namespace    https://github.com/Giglium/tf2-UserScript
// @version      1.1
// @description  Bump trades on backpack.tf
// @author       Giglium
// @match        https://backpack.tf/classifieds?steamid=*
// @icon         https://backpack.tf/favicon_440.ico
// @noframes
// @run-at       document-idle
// @grant        none
// @license      MIT Licens
// @updateURL    https://raw.githubusercontent.com/Giglium/tf2-UserScript/master/Backpack_tf_Classifieds_Bumps/backpacktfClassifiedsBumps.meta.js
// @downloadURL  https://github.com/Giglium/tf2-UserScript/blob/master/Backpack_tf_Classifieds_Bumps/backpacktfClassifiedsBumps.user.js
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

    var itemsToBump = document.getElementsByClassName( 'listing-bump' );

    if( itemsToBump.length ){

        for( var i = 0; i < itemsToBump.length; ++i ){
            var event = itemsToBump.item( i ).ownerDocument.createEvent( 'MouseEvents' );
            event.initMouseEvent( 'contextmenu', true, true, itemsToBump.item( i ).ownerDocument.defaultView, 1, 0, 0, 0, 0, false,false, false, false, 2, null );
            itemsToBump.item( i ).dispatchEvent( event );
        }

        var nextPage =  document.getElementsByClassName( 'active' )[1].nextSibling,
            nextPageURL = $( 'a', nextPage ).attr( 'href' );
        if( typeof nextPageURL != 'undefined' )
            window.location.href = nextPageURL;
        else
            setTimeout(function(){ location.reload(); }, 5000);
    }
    else{
        var length = window.location.href.indexOf( '&page' );
        if( length !== -1 )
            setTimeout(function(){ window.location.href =  window.location.href.substring( 0, length ); }, 5000);
        else{
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
        }
    }

})();
