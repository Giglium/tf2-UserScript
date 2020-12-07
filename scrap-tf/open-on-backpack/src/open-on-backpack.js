/**
 * Return all the selectors used in this script
 * @returns {{ITEM: string}}
 */
function selectors() {
    return {
        ITEM: ".item",
    };
}

/**
 * Return all events used in this script
 * @returns {{CLICK: string}}
 */
function events() {
    return {
        CLICK: "click",
    };
}

/**
 * Return all the constants used in this script
 * @returns {{FONT_AWESOME_CLASS: string, CSGO_ENDPOINT: string, QUALITY: string, BACKPACK_LINK_CLASS_NAME: string, ICON_EXTERNAL_LINK: string, DOTA2_ENDPOINT: string, UNCRAFT: string, CSGO_QUALITY_NUMBER: number, DOTA2_QUALITY_NUMBER: number, TEAM_FORTRESS_ENDPOINT: string}}
 */
function constants() {
    return {
        UNCRAFT: "uncraft",
        QUALITY: "quality",
        DOTA2_QUALITY_NUMBER: 4,
        CSGO_QUALITY_NUMBER: 0,
        BACKPACK_LINK_CLASS_NAME: "bpLink",
        FONT_AWESOME_CLASS: "fa",
        ICON_EXTERNAL_LINK: "fa-external-link",
        DOTA2_ENDPOINT: "https://dota2.backpack.tf/stats",
        CSGO_ENDPOINT: "https://csgo.backpack.tf/stats",
        TEAM_FORTRESS_ENDPOINT: "https://backpack.tf/stats",
    };
}

/**
 * Add css style for the icon link
 */
function injectLinkCssStyle(){
    let css = ".bpLink{font-size: 12px; position: absolute; bottom: 2px; left: 2px;} .bpLink a{color: inherit;}.quality5:not(.app730) {border-color: #943282;border-bottom-color: #943282!important;border-right-color: #943282!important;color: #943282;}",
        head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style");

    head.appendChild(style);

    style.appendChild(document.createTextNode(css));
}

/**
 * @returns {NodeListOf<Element>} all the item that are in the page
 */
function getRawItems(){
    return document.querySelectorAll(selectors().ITEM);
}

class Item {
    /**
     *  The constructor take an HTML element that represent an item in the Scrap.tf site and it will scrap all the useful information
     * @param {HTMLElement} rawItem to transform
     */
    constructor(rawItem) {
        let self = this;

        this._index = rawItem.dataset.defindex;
        this._name = rawItem.dataset.title;
        this._isCraftable = rawItem.classList.contains(constants().UNCRAFT);
        rawItem.classList.forEach((className) => {
            if (className.indexOf(constants().QUALITY) !== -1){
                self._quality = className;
            }
        });
    }

    /**
     * @returns {string} the name of the item
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {string} the Scrap.tr/Backpack.tf index of the item (?Probably is the unique id?)
     */
    get index() {
        return this._index;
    }

    /**
     * @returns {boolean} if it is a craftable item or not
     */
    get isCraftable() {
        return this._isCraftable;
    }

    /**
     * @returns {number} A number that represent the quality of the item
     */
    get qualityNumber(){
        return parseInt(this._quality.replace(/^\D+/g, ""), 10);
    }

    /**
     * @returns {boolean} if the item is a Steam object it will return false since is not supported by Backpack.tf
     */
    get isSupportedByBackpack(){
        return this._quality.indexOf( "steamCard" ) === -1 && this._quality.indexOf( "Emoticon" ) === -1 && this._quality.indexOf( "Profile" ) === -1;
    }

    get backpackLink(){
        let href = "";

        switch (this.qualityNumber){
            case constants().CSGO_QUALITY_NUMBER:
                href = [constants().CSGO_ENDPOINT, encodeURIComponent(this._name.replace(/&apos;/g, "'"))].join("/");
                break;
            case constants().DOTA2_QUALITY_NUMBER:
                href = [constants().TEAM_FORTRESS_ENDPOINT, this.qualityNumber, this._index, "Tradable", this.isCraftable ? "Non-Craftable" : "Craftable"].join("/");
                break;
            default:
                href = [constants().TEAM_FORTRESS_ENDPOINT, this.qualityNumber, this._index, "Tradable", this.isCraftable ? "Non-Craftable" : "Craftable"].join("/");
        }

        return href;
    }
}

/**
 * Main Function
 */
(function() {
    "use strict";

    injectLinkCssStyle();

    let items = getRawItems();

    items.forEach((rawItem) => {
        let item = new Item(rawItem);

        // warpaint is not supported yet
        if(item.isSupportedByBackpack){
            let div = document.createElement("div"),
                a = document.createElement("a"),
                i = document.createElement("i");

            div.className = constants().BACKPACK_LINK_CLASS_NAME;
            div.appendChild(a);

            a.appendChild(i);
            a.href = item.backpackLink;
            a.target = "_blank";

            a.addEventListener(events().CLICK ,(event) => {
                event.stopImmediatePropagation();
            });

            i.classList.add(constants().FONT_AWESOME_CLASS);
            i.classList.add(constants().ICON_EXTERNAL_LINK);
            i.setAttribute("aria-hidden", "true");

            rawItem.appendChild(div);
        }
    });
})();
