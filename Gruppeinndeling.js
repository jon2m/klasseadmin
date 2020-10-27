let testKlasse = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let testAntall = 13;
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

        if(parseInt(elever.length / delingsantall) < 2) {
            let maksGrupperMulig = 0;
            for(let i = 1; i < 1000; i++) {
                if(parseInt(elever.length / i) > 1) {
                    maksGrupperMulig = i;
                }
                else {
                    break;
                }
            }
            delingsantall = maksGrupperMulig; 
        }

        if(lagUtIfra === "gruppe") {
            antallPerGruppe = parseInt(elever.length / delingsantall);
            antallTilOvers = elever.length % delingsantall;

            if(antallTilOvers > delingsantall) {
                
            }
        }
        else if(lagUtIfra === "elev") {
            antallPerGruppe = delingsantall;
            antallTilOvers = elever.length % delingsantall;


        }

        console.log(object);
    }
}

console.log(gruppeInndeling(testKlasse, testAntall, testSortering));