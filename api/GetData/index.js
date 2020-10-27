module.exports = async function (context, req, inndata) { // tar inn databasekoblingen som en parameter
    var id = context.bindingData.id;
    if (typeof(inndata[0]) !== "undefined") {   // hvis det finnes data i db under gitt id
        context.res = {
            body: {
                text: JSON.stringify(inndata[0])
            }
        }
    }
    else context.res = {
        body: {
            text: id+' har ingen klasser'
        }
    }
}