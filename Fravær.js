window.onload = oppstart;

Klasse = ["Erik","Åmund","Jon","Kjell","Bryan","Sindre","Bonsa","Mathilde","Sven","Magnus","Adrian","Julianne","Ola","Anders","Mikkel","Andreas","Herman","Ulrik"]; //Ordentlig klasse med elever
let eleverFravaer = [];                                                                     //Lagrer de som ikke har vært tilstede for seinere bruk

function oppstart() {
    const listeLengde = Klasse.length;
    for(let i = 0; i < listeLengde; i++) {                                                  //Lager en div til hver elev
        let elevDiv = document.createElement("div");
        elevDiv.id = Klasse[i];
        elevDiv.className = "elevDiv";

        let nyElevNavn = document.createElement("p");
        nyElevNavn.innerHTML = Klasse[i];

        let nyBtnFravaer = document.createElement("button");
        nyBtnFravaer.id = "btnFravaer" + Klasse[i];
        nyBtnFravaer.className = "btnFravaer";
        nyBtnFravaer.value = "green";
        nyBtnFravaer.innerHTML = "Tilstede";
        nyBtnFravaer.onclick = fravaer;                                                     //Kjører funskjonen fravaer() når buttonen blir trykket

        document.getElementById("elevListe").appendChild(elevDiv);                          //Legger til diven for eleven på nettsiden
        document.getElementById(Klasse[i]).appendChild(nyElevNavn);                         //Legger til navnet i den diven nettopp lagt til
        document.getElementById(Klasse[i]).appendChild(nyBtnFravaer);                       //Legger til knappen også :)
    }
}

function fravaer(event) {
    let elevMedKode = event.target.id;                                                      //Finner id-en til den eleven som får registrert fravær
    let elev = elevMedKode.replace("btnFravaer", "");                                       //Fjerner all fra id-en utenom navnet til eleven

    if(document.getElementById(elevMedKode).value === "green") {                            //Gjør diven rød og registrerer fravær hvis den er grønn
        document.getElementById(elevMedKode).style.backgroundColor = "red";
        document.getElementById(elev).style.borderColor = "red";
        document.getElementById(elevMedKode).value = "red";
        document.getElementById(elevMedKode).innerHTML = "Fravær";
        
        let elevIndex = Klasse.indexOf(elev);                                               //Finner indexen til eleven registrert
        eleverFravaer.push(Klasse[elevIndex]);                                              //Legger til eleven i arrayet over de som får fravær
        Klasse.splice(elevIndex, 1);                                                        //Fjerner fra hovedlista
    }
    else {
        document.getElementById(elevMedKode).style.backgroundColor = "green";               //Hvis den er rød, så gjør den diven grønn, slik at man kan rette opp i feil registrering
        document.getElementById(elev).style.borderColor = "green";
        document.getElementById(elevMedKode).value = "green";
        document.getElementById(elevMedKode).innerHTML = "Tilstede";

        let elevIndex = eleverFravaer.indexOf(elev);
        Klasse.push(eleverFravaer[elevIndex]);
        eleverFravaer.splice(elevIndex, 1);
    }   
}

function eleverTilstede() {                                                                 //En test, slik at man får sett resultatet i console.log. !KUN FOR TEST, IKKE FOR FERDIG PROGRAM!
    console.log("Elever som er tilstede: " + Klasse);
    console.log("Fravær: " + eleverFravaer);
    console.log("----------------------------");
}