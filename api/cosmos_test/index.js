module.exports = async function (context) {
    let databaseId = 'klasser';
    let containerId = 'laerere';
    // henter ut data fra app-settings
    let endpoint = process.env.endpoint;
    let key = process.env.key;
    // henter id fra URL:
    let id = context.bindingData.id;

    // setter opp cosoms-klienten
    const CosmosClient = require("@azure/cosmos").CosmosClient;
    const client = new CosmosClient({ endpoint, key });
    // definerer database og konteiner 
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // lager query som henter ut klasser der hvor ID stemmer
    const querySpec = {
        query: "SELECT c.klasser from c WHERE c.id=\'"+id+"\'"
    };
    // gjør selve hentinga
    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    // response
    if (typeof (items[0]) !== "undefined") {   // hvis det finnes data i db under gitt id
        context.res = {
            body: items[0]        // sender response med klassene til læreren med IDen {id}
        }
    }
    else context.res = {
        body: {
            text: 'undefined',
            status: 400
        }
    }
}