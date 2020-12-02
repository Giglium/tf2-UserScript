/**
 * Return all the selectors used in this script
 * @returns {{PANEL_RAFFLE: string, PANEL: string, ENTER_RAFFLE_BUTTON: string}}
 */
function selectors(){
    return {
        PANEL_RAFFLE: ".panel-raffle",
        PANEL: ".panel.panel-info",
        ENTER_RAFFLE_BUTTON: ".btn.btn-embossed.btn-info.btn-lg",
    }
}

/**
 * Return all the constants used in this script
 * @returns {{BASE_SITE: string, RAFFLES_HOMEPAGE: string, ATTEMPTS: number, ENTERED_RAFFLE: string}}
 */
function constants(){
    return {
        ENTERED_RAFFLE: "raffle-entered",
        ATTEMPTS: 5,
        BASE_SITE: "https://scrap.tf",
        RAFFLES_HOMEPAGE: this.BASE_SITE + "/raffles"
    }
}

/**
 * Load new raffles and check if it can enter is some of it. If all @attempts fails to find new raffles it will reload the page
 * @param {int} attempts the number time this function try to find new raffles
 */
function checkRaffles( attempts ){
    if(attempts !== 0){
        let raffles = getNewRaffles();
        if(raffles.length === 0) {
            ScrapTF.Raffles.Pagination.LoadNext(); // Load more raffles
            setTimeout(() => {
                checkRaffles(--attempts);
            }, getRandomTime() * (1 - attempts));
        }else{
            enterRaffle(raffles[0])
        }
    }else{
        returnToRafflesPage();
    }
}

/**
 * @returns {T[]|*[]} Return all the not entered raffles found in the page
 */
function getNewRaffles(){
    let panels = document.querySelectorAll(selectors().PANEL),
        raffle_panel;

    if(panels.length === 0) return []

    if(panels.length > 1){raffle_panel = panels[1] }// panels[0] == won raffles panel
    else{raffle_panel = panels[0]}

    return Array.from(raffle_panel.querySelectorAll(selectors().PANEL_RAFFLE)).filter( raffle => !raffle.classList.contains(constants().ENTERED_RAFFLE))
}

/**
 * Redirect to @constant.RAFFLES_HOMEPAGE
 */
function returnToRafflesPage(){
    window.location.href = constants().RAFFLES_HOMEPAGE;
}

/**
 * Enter into teh given @raffle
 * @param {HTMLElement} raffle to enter
 */
function enterRaffle(raffle){
    raffle.getElementsByTagName("A")[0].click();
}

/**
 * @returns {number} a random time in millisecond that is always greater or equal 10 seconds.
 */
function getRandomTime(){
    return Math.random() * ( 20000 - 10000 ) + 10000;
}

/**
 * Main function
 */
(function() {
    'use strict';

    if( document.getElementById('recaptcha-token') ){
        return; // Stop on recaptcha
    }

    console.log("test")

    let div = document.createElement('div');
    div.className = 'alert alert-info';
    div.setAttribute( 'style', 'position:fixed;bottom:0;right:0;z-index:999999;' );
    document.getElementsByTagName( 'body' )[0].appendChild( div );
    div.innerHTML = 'Checking for new Raffles';

    let raffles = getNewRaffles()

    if( raffles.length === 0 ){
        let enterRaffleButton = document.querySelector(selectors().ENTER_RAFFLE_BUTTON)

        if(enterRaffleButton != null){
            let RefreshDate = new Date( new Date().getTime() + Math.round( getRandomTime() ) );

            let countdown = setInterval(() => {
                let distance = RefreshDate - new Date(),
                    seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000);

                div.innerHTML = 'I\'ll enter in the raffle in: ' + seconds + 's ';

                if ( distance < 0 ) {
                    clearInterval( countdown );
                    div.innerHTML = 'I am entering in the Raffle';
                    enterRaffleButton.click();
                    seconds = Math.floor( ( getRandomTime() % ( 1000 * 60 ) ) / 1000);
                    div.innerHTML = 'Wait ' + seconds + ' seconds before continue...';

                    setInterval(() => {
                        returnToRafflesPage();
                    }, getRandomTime());
                }
            }, 1000);
        }else {
            div.innerHTML = 'Checking for new raffles, please wait...';
            checkRaffles(constants().ATTEMPTS);
        }
    }else{
        enterRaffle(raffles[0]);
    }
})();
