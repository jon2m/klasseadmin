let testKlasse = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let testAntall = 10;
let testSortering = "gruppe";

function gruppeInndeling(klasse, antall, inndeling) {    
    let delingsantall = antall;

    if(isNaN(delingsantall)) {
        let feilmelding = 'Beklager, men "' + delingsantall + '" er ikke et gyldig antall.';
        return feilmelding;
    }
    else {
        let reverseringAvFerdigListe = true;

        let lagUtIfra = inndeling;
        let elever = klasse;
        delingsantall = Math.abs(delingsantall);
        
        let antallPerGruppe = 0;
        let antallTilOvers = 0;
        let ferdigGrupper = [];
        let undergrupper = [];
        
        if(lagUtIfra === "gruppe") {
            antallPerGruppe = parseInt(elever.length / delingsantall);
            antallTilOvers = elever.length % delingsantall;

            if(parseInt(elever.length / delingsantall) < 2) {
                let maksMulig = 0;
                for(let i = 1; i < 1000; i++) {
                    if(parseInt(elever.length / i) > 1) {
                        maksMulig = i;
                    }
                    else {
                        break;
                    }
                }
                delingsantall = maksMulig;
                antallPerGruppe = parseInt(elever.length / delingsantall);
                antallTilOvers = elever.length % delingsantall;
            }

            for(let j = 0; j < delingsantall; j++) {
                for(let k = 0; k < antallPerGruppe; k++) {
                    let elevNr = Math.floor(Math.random() * elever.length);
                    let elevNavn = elever[elevNr];
                    undergrupper.push(elevNavn);
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

            ferdigGrupper.reverse();
            return ferdigGrupper;
        }

        else if(lagUtIfra === "elev") {
            console.log("Under arbeid");
        }

    }
}

gruppeInndeling(testKlasse, testAntall, testSortering);