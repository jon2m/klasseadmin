//
//  'Innlogging'
// 

var laerer_id;
var klasse_data;
var testClass;

window.onload = function() {
    oppstart_innlogging();
    oppstart_velg_elev();
}

function oppstart_innlogging() {
    laerer_id = document.getElementById('laerer_id');
    laerer_id.focus();      // fokuserer på inputfeltet
    document.getElementById('btn_laerer').onclick = req;
    onkeydown = function (evt) {        // hvis brukeren trykker på enter
        if (evt.keyCode === 13 && laerer_id === document.activeElement) req();
    }
}

async function req() {
    if (laerer_id.value !== '') {                   // hvis det er skrevet inn noe i inputen
        let em = document.getElementById('valg_klassekoder');
        while (em.lastChild) em.removeChild(em.lastChild);     // sletter alle child-elements
        klasse_data = await( await fetch("/api/klasse_data/"+laerer_id.value)).json();  // henter klasser fra API

        if (klasse_data.text !== 'undefined') {          // hvis læreren som ble skrevet inn har klasser
            let klasseliste = klasse_data.klasser;       // legger klassene til lærer i liste
            let klassekoder = [];
            for (let i=0; i<klasseliste.length; i++)     // legger til klassekodene i liste
                klassekoder.push(klasseliste[i].id);
            // generer valg av klasser
            for (let i=0; i<klassekoder.length; i++) {
                let nytt_element = document.createElement('option');
                nytt_element.value = klassekoder[i];
                nytt_element.innerHTML = klassekoder[i];
                nytt_element.addEventListener('click',legg_til_klasse);    // legger til hendelseslytter til klassene
                em.appendChild(nytt_element);           // legger til nytt options-element
            }
        }
    }
}



function legg_til_klasse() {
    let klasse_id = document.getElementById('valg_klassekoder').value;
    let klasser = klasse_data.klasser;

    // legge til angitt klasse i minnet //

    for (let i=0; i<klasser.length; i++)    // kjører gjennom klassene til læreren og finner den med riktig id
        if (klasser[i].id === klasse_id) testClass = klasser[i].elever;    
}

// 
//      valg av elev:
// 

var antall_elever;
var nytt_em;
var tilfeldig_valgt_elev;
var tilfeldig_index;
var jobbe_liste_elever;     // liste som det kan slettes elever fra under utvalg
var em;

function oppstart_velg_elev() {
    antall_elever = document.getElementById('antall_elever');
    antall_elever.focus();  // fokuserer på inputfeltet
    document.getElementById('btn_elever').onclick = velg_elever;
    onkeydown = function (evt) {    // hvis brukeren trykker på enter
        if (evt.keyCode === 13 && antall_elever === document.activeElement) velg_elever();
    }
}

function velg_elever() {
    em = document.getElementById('elev_utvalg');
    while (em.lastChild) em.removeChild(em.lastChild);   // sletter alle child-elements
    // lager egen liste av elever til å hente og slette elementer fra
    jobbe_liste_elever = testClass.slice(0);
    antall = (+antall_elever.value < testClass.length ? +antall_elever.value : testClass.length);

    for (var i=0; i<antall; i++) {
        tilfeldig_index = Math.floor((Math.random() * jobbe_liste_elever.length));  // tilfeldig valg av 
        tilfeldig_valgt_elev = jobbe_liste_elever[tilfeldig_index];                 // elev fra klasse
        jobbe_liste_elever.splice(tilfeldig_index,1);
        // genererer nytt element
        nytt_em = document.createElement('div');
        nytt_em.innerHTML = "<h3 class='text-primary mb-3'>"+tilfeldig_valgt_elev+"</h3>";   
        nytt_em.className = 'col-3 p-1';
        document.getElementById('elev_utvalg').appendChild(nytt_em);
    }
}
