const { MongoClient } = require('mongodb');

async function main() {
    const connectionURL = 'mongodb+srv://prateekpathak042:gJ00p6LNs5SW0yxp@cluster0.iiynm78.mongodb.net/';
    const databaseName = 'User';

    try {
        const client = await MongoClient.connect(connectionURL, { useNewUrlParser: true });
        console.log('Connected successfully');

        const db = client.db(databaseName);

        const result = await db.collection('users').insertOne({
            name: 'yuba'
        });

        console.log(result.ops);
    } catch (error) {
        console.error('Error:', error);
    } 
}

main();
