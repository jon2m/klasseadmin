module.exports = async function (context, req, inndata) { // tar inn databasekoblingen som parameter 'inndata'
    var id = context.bindingData.id;
    if (typeof(inndata[0]) !== "undefined") {   // hvis det finnes data i db under gitt id
        context.res = {
            body: inndata[0]        // sender response med klassene til læreren med iden {id}
        }
    }
    else context.res = {
        body: {
            text: endpoint,
            status: 400
        }
    }
}