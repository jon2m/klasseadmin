module.exports = async function (context, req, inndata) { // tar inn databasekoblingen som parameter 'inndata'
    var id = context.bindingData.id;
    if (typeof(inndata[0]) !== "undefined") {   // hvis det finnes data i db under gitt id
        let klasseliste = inndata[0].klasser;
        let klassekoder = [];
        for (let i=0; i<klasseliste.length; i++)    // legger til klassekodene i liste
            klassekoder.push(klasseliste[i].id);

        context.res = {
            body: klassekoder        // sender response med klassekoder
        }
    }
    else context.res = {
        body: {
            text: id+' har ingen klasser'
        }
    }
}