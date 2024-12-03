import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    console.log(uri)
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri,options)
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri,options);
    clientPromise = client.connect()
}

export {clientPromise, dbName};
