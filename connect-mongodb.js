const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
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
    /* await createProduct(client, {
      name: "Bread and Butter",
      price: "1500"
    }); */
    // await updateProductById(client, "5fa33e327dd40d3f3c6c23d6", { price: "8500", type: "breakfast" });
    await deleteProductById(client, "5fa1b42ac11e7052744c40cb");

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

async function updateProductById(client, idOfProduct, updatedProduct) {
  result = await client.db("ajidefideo").collection("products")
    .updateOne({ _id: ObjectId(idOfProduct) }, { $set: updatedProduct });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteProductById(client, idOfProduct) {
  result = await client.db("ajidefideo").collection("products")
          .deleteOne({ _id: ObjectId(idOfProduct) });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

main().catch(console.error);
