module.exports = async function (context, req, utdata) {  
    let databaseId = 'klasser';
    let containerId = 'laerere';
    // henter ut data fra app-settings
    let endpoint = process.env.endpoint;
    let key = process.env.key;
    // henter id, klasse_id og elever fra URL:
    let id = context.bindingData.id;
    let klasse_id = context.bindingData.klasse_id;
    let elever = context.bindingData.elever;

    // setter opp cosoms-klienten
    const CosmosClient = require("@azure/cosmos").CosmosClient;
    const client = new CosmosClient({ endpoint, key });
    // definerer database og konteiner 
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    const querySpec = {
        query: "SELECT * from c"
    };

    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    let newItem = {
        'id': id,
        'klasser': [
            {
                'id': klasse_id,
                'elever': elever
            }
        ]
    }

    // const { resource: createdItem } = await container.items.create(newItem);

    context.res = {
        body: items
    };
}
