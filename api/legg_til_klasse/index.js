module.exports = async function (context, req, utdata) {  
    databaseId = 'klasser';
    containerId = 'laerere';

    // setter opp cosoms-klienten
    const CosmosClient = require("@azure/cosmos").CosmosClient;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    const querySpec = {
        query: "SELECT * from c"
    };

    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    context.res = {
        body: items
    };
}
