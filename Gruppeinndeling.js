//Linje 2, 3 og 4 fjernes når frontend lages!
let testKlasse = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29"];
let testSortering = "elev";
let testAntall = 5;

function gruppeInndeling(klasse, antall, inndeling) {    
    let delingsantall = antall;

    if(isNaN(delingsantall)) {                                                                  //Sjekker om tallet oppgitt er et tall eller ikke
        let feilmelding = 'Beklager, men "' + delingsantall + '" er ikke et gyldig antall.';
        return feilmelding;                                                                     //Avslutter funskjonen her, og returnerer feilmeldingen
    }
    else {
        let lagUtIfra = inndeling;                                                              //Forteller programmet om den skal lage ut ifra "elev" eller "gruppe"
        let elever = klasse;                                                                    //Henter inn klassen
        delingsantall = Math.abs(delingsantall);                                                //Finner absoluttverdi, slik at negative tall ikke skal ødelegge
        
        let antallPerGruppe = 0;                                                                //Initsialisering
        let antallTilOvers = 0;
        let ferdigGrupper = [];
        let undergrupper = [];
        
        if(lagUtIfra === "gruppe") {                                                            //Lager grupper hvis det er valgt grupper
            antallPerGruppe = parseInt(elever.length / delingsantall);
            antallTilOvers = elever.length % delingsantall;

            if(parseInt(elever.length / delingsantall) < 2) {                                   //Finner det høyeste mulige, slik at høye verdier ikke skal ødelegge
                let maksMulig = 0;
                for(let i = 1; i < 10000; i++) {                                                //Mulighet til å finne høyest mulig antall grupper, for klasser opp til 10000 personer
                    if(parseInt(elever.length / i) > 1) {
                        maksMulig = i;                                                          //Legger til den høyeste verdien i en variabel
                    }
                    else {
                        break;                                                                  //Avslutter løkka hvis det ikke finnes et høyere tall lenger, slik at den ikke kjører 10000
                    }
                }
                delingsantall = maksMulig;
                antallPerGruppe = parseInt(elever.length / delingsantall);
                antallTilOvers = elever.length % delingsantall;
            }

            for(let j = 0; j < delingsantall; j++) {                                            //Kjører for x-antall grupper det skal være
                for(let k = 0; k < antallPerGruppe; k++) {                                      //Kjører for x-antall personer per gruppe
                    let elevNr = Math.floor(Math.random() * elever.length);                     //Finner en random person fra hovedgruppa
                    let elevNavn = elever[elevNr];
                    undergrupper.push(elevNavn);
                    elever.splice(elevNr, 1);                                                   //Fjerner personen fra hovedgruppa, slik at den ikke kan bli valgt igjen
                }
                if(antallTilOvers > 0) {                                                        //Legger til 1 person som er til overs
                    let ekstraElevNr = Math.floor(Math.random() * elever.length);
                    let ekstraElevNavn = elever[ekstraElevNr];
                    undergrupper.push(ekstraElevNavn);
                    elever.splice(ekstraElevNr, 1);
                    antallTilOvers--;                                                           //Fjerner 1 som er til overs
                }
                ferdigGrupper.push(undergrupper)
                undergrupper = [];                                                              //Tømmer mellomlagringen for klassene, etter å ha blitt lagt til i sluttlista
            }

            ferdigGrupper.reverse();
            return ferdigGrupper;                                                               //Returnerer den ferdige lista med ulike grupper
        }

        else if(lagUtIfra === "elev") {                                                         //Lager grupper hvis det er valgt elev
            antallPerGruppe = delingsantall;
            delingsantall = parseInt(elever.length / antallPerGruppe);
            antallTilOvers = elever.length - (antallPerGruppe * delingsantall);
            let reversering = true;                                                             //Gir muligheten til å ikke reversere lista

            if (delingsantall < antallTilOvers && antallTilOvers + 1 === antallPerGruppe || antallTilOvers + 1 === antallPerGruppe && antallTilOvers + 1 === delingsantall) {
                delingsantall++;                                                                //Legger til en gruppe
                antallTilOvers = 0;                                                             //Fjerner de som er til overs, fordi nå blir de egen gruppe
                reversering = false;
            }
            else if(delingsantall < antallTilOvers && antallTilOvers + 1 !== antallPerGruppe) {
                delingsantall++;
                antallPerGruppe = parseInt(elever.length / delingsantall);                      //Finner et bedre antall for gruppene enn det som ble oppgitt
                antallTilOvers = elever.length % delingsantall;
                reversering = false;
            }

            for(let l = 0; l < delingsantall; l++) {                                            //Kjører for x-antall grupper det skal være
                for(let m = 0; m < antallPerGruppe; m++) {                                      //Kjører for x-antall personer per gruppe
                    let elevNr = Math.floor(Math.random() * elever.length);
                    let elevNavn = elever[elevNr];
                    if(elevNavn !== undefined) {                                                //Legger bare til så lenge eleven er definert
                        undergrupper.push(elevNavn);
                    }
                    elever.splice(elevNr, 1);
                }
                if(antallTilOvers > 0) {
                    let ekstraElevNr = Math.floor(Math.random() * elever.length);
                    let ekstraElevNavn = elever[ekstraElevNr];
                    undergrupper.push(ekstraElevNavn);
                    elever.splice(ekstraElevNr, 1);
                    antallTilOvers--;
                }
                ferdigGrupper.push(undergrupper)
                undergrupper = [];
            }

            if(reversering === true) {                                                          //Reverserer så lenge det er ønsket
                ferdigGrupper.reverse();
            }
            return ferdigGrupper;                                                               //Returnerer de ferdige gruppene
        }
    }
}

//Fjernes når frontend lages!
console.log(gruppeInndeling(testKlasse, testAntall, testSortering));