// ==UserScript==
// @name         Scrap.tf Open On Backpack
// @namespace    https://github.com/Giglium/tf2-UserScript
// @version      1.1
// @description  It generate a link on scrap.tf for open the item on backpack.tf
// @author       Giglium
// @include      /^https?:\/\/.*\.?scrap\.tf\/(auctions|weapons|hats|items|unusuals|skins|killstreaks|stranges|partswap|raffles).*/
// @icon         https://scrap.tf/favicon-32x32.png?v=4
// @noframes
// @run-at       document-end
// @grant        none
// @license      MIT Licens
// @updateURL   https://github.com/Giglium/tf2-UserScript/raw/master/Scrap_tf_Open_On_Backpack/scraptfOpenOnBackpack.meta.js
// @downloadURL https://github.com/Giglium/tf2-UserScript/raw/master/Scrap_tf_Open_On_Backpack/scraptfOpenOnBackpack.user.js
// @supportURL  https://github.com/Giglium/tf2-UserScript/issues
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.bpLink{font-size: 12px; position: absolute; bottom: 2px; left: 2px;} .bpLink a{color: inherit;}.quality5:not(.app730) {border-color: #943282;border-bottom-color: #943282!important;border-right-color: #943282!important;color: #943282;}';
    document.getElementsByTagName('head')[0].appendChild(style);

    var items = document.getElementsByClassName( 'item' );

    for( var i = 0; i < items.length; ++i ){
        var name = $( items[i] ).attr( 'data-defindex' ),
            quality = $( items[i] ).attr( 'class' ),
            craft = quality.indexOf( 'uncraft' ) == -1 ? 'Craftable' : 'Non-Craftable',
            lenght = quality.indexOf( 'quality' );

        if( quality.indexOf( 'steamCard' ) == -1 && quality.indexOf( 'Emoticon' ) == -1 && quality.indexOf( 'Profile' ) == -1 ){
            quality = quality.substring( lenght+7, lenght+9 );
            quality = quality.replace(' ','');
            if( quality == 15 ){
                name = $( items[i] ).attr( 'data-title' );
                var grade = $( items[i] ).attr( 'data-content' );
                grade = grade.substring( grade.indexOf('Grade') + 6, grade.indexOf(')') + 1 );
                name = name + '| ' + grade;
                name =  encodeURIComponent( name.replace(/<\/?span[^>]*>/g,'').replace(/&apos;/g, "'").replace('Strange ','') );
            }

            var div = document.createElement('div');
            div.className = 'bpLink';

            if( name === '0' ){
                name = $( items[i] ).attr( 'data-title' );
                name =  encodeURIComponent( name.replace(/&apos;/g, "'") );
                div.innerHTML = '<a href="https://csgo.backpack.tf/stats/' + name + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
            }
            else
                if( quality == 4 ){
                    name = $( items[i] ).attr( 'data-title' );
                    name =  encodeURIComponent( name.replace(/&apos;/g, "'") );
                    div.innerHTML = '<a href="https://dota2.backpack.tf/stats/' + name + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
                }
                else
                    div.innerHTML = '<a href="https://backpack.tf/stats/' + quality +'/' + name +'/Tradable/' + craft + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>';

            items[i].appendChild( div );
        }
    }
})();
