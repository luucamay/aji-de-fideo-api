const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';


  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // await listDatabases(client);
    // await readCollection(client);
    await createProduct(client, {
      name: "Bread and Butter",
      price: "1500"
    });

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function readCollection(client) {
  const coll = client.db('ajidefideo').collection('products').find();

  const results = await coll.toArray();
  results.forEach(console.log)
}

async function createProduct(client, newProduct) {
  const result = await client.db("ajidefideo").collection("products").insertOne(newProduct);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

main().catch(console.error);
