// ==UserScript==
// @name         Scrap.tf Open On Backpack
// @namespace
// @version      1.0
// @description  It generate a link on scrap.tf for open the item on backpack.tf
// @author       Giglium
// @include      /^https?:\/\/.*\.?scrap\.tf\/(auctions|weapons|hats|items|unusuals|skins|killstreaks|stranges|partswap|raffles).*/
// @icon         https://scrap.tf/favicon-32x32.png?v=4
// @noframes
// @run-at       document-end
// @grant        none
// @license      MIT Licens
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.bpLink{font-size: 12px; position: absolute; bottom: 2px; left: 2px;} .bpLink a{color: inherit;}.quality5:not(.app730) {border-color: #943282;border-bottom-color: #943282!important;border-right-color: #943282!important;color: #943282;}';
    document.getElementsByTagName('head')[0].appendChild(style);

    var items = document.getElementsByClassName( 'item' );
console.log(items);
    console.log(items.lenght);
    for( var i = 0; i < items.length; ++i ){
        console.log(i);
        var name = $( items[i] ).attr( 'data-defindex' ),
            quality = $( items[i] ).attr( 'class' ),
            craft = quality.indexOf( 'uncraft' ) == -1 ? 'Craftable' : 'Non-Craftable',
            lenght = quality.indexOf( 'quality' );

        quality = quality.substring( lenght+7, lenght+9 );
        quality = quality.replace(' ','');
        if( quality == 15 ){
            name = $( items[i] ).attr( 'data-title' );
            var grade = $( items[i] ).attr( 'data-content' );
            grade = grade.substring( grade.indexOf('Grade') + 6, grade.indexOf(')') + 1 );
            name = name + '| ' + grade;
            name =  encodeURIComponent( name.replace(/<\/?span[^>]*>/g,'').replace(/&apos;/g, "'").replace('Strange ','') );
        }
console.log(name);
        var div = document.createElement('div');
        div.className = 'bpLink';
        div.innerHTML = '<a href="https://backpack.tf/stats/' + quality +'/' + name +'/Tradable/' + craft + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
        items[i].appendChild( div );
    }
})();
