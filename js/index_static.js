var laerer_id;
var klasse_data;

window.onload = function() {
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

        // 
        // tester CosmosClient
        klasse_data = await( await fetch("/api/cosmos_test/"+laerer_id.value)).json();  // henter klasser fra API
        // 
        // 

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
                nytt_element.addEventListener('click',presenter_elever);    // legger til hendelseslytter til klassene
                em.appendChild(nytt_element);           // legger til nytt options-element
            }
        }
    }
}

function presenter_elever() {
    let klasse_id = document.getElementById('valg_klassekoder').value;
    let klasser = klasse_data.klasser;
    let elever;

    // legge til angitt klasse i minnet //

    for (let i=0; i<klasser.length; i++) if (klasser[i].id === klasse_id) elever = klasser[i].elever;
    document.getElementById('txt_elever').innerHTML = elever;
}
