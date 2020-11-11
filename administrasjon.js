let laerer;
let btn_laerer;
let ny_klassekode;
let nye_elever;
let btn_legg_til;

window.onload = function() {
    laerer = document.getElementById('laerer_id');
    btn_laerer = document.getElementById('btn_laerer');
    ny_klassekode = document.getElementById('ny_klassekode');
    nye_elever = document.getElementById('nye_elever');
    btn_legg_til = document.getElementById('btn_legg_til');

    laerer.focus();

    btn_laerer.onclick = hent_klasser;    // hente klasser når lærer 'logger inn'
    onkeydown = function (evt) {
        if (evt.keyCode === 13) {        // hvis brukeren trykker på enter
            if (laerer === document.activeElement) hent_klasser();
            else if (ny_klassekode === document.activeElement) nye_elever.focus();  // fokusere på neste input
        }
    }

    // kjøre gjennom tekstbehandling, for så å legge til klasse
    btn_legg_til.onclick = tekstbehandling;
    
}

async function hent_klasser() {
    console.log('logget inn som '+laerer.value);
}

function tekstbehandling() {
    elever = nye_elever.value.split(',');                               // deler opp på komma
    for (let i=0; i<elever.length; i++) {
        elever[i] = elever[i].split(' ');                               // deler opp på mellomrom
        
        let j = 0;
        while (j<elever[i].length) {
            elever[i][j] = elever[i][j].split('\n').join('');       // tar bort linjeskift
            if (elever[i][j] === '')
                elever[i].splice(j,1);           // sletter tomme elementer
            else j++;
        }
        elever[i] = elever[i].join(' ');                                // setter de sammmen igjen med mellomrom mellom
    }
    console.log('lagt til klasse '+ny_klassekode.value+' med elevene '+elever);
    legg_til_klasse(ny_klassekode.value, elever);
}

async function legg_til_klasse(klassekode, elever) {
    let klassedata = {
        "id": klassekode,
        "elever": elever,
    }
    // klassedata = await( await fetch("/api/legg_til_klasse/"+laerer_id.value)).json();  // sender klassedata til API

}