const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.dbName = DB_NAME;
  }
  async connect() {
    try {
      await this.client.connect();
      await this.client.db(this.dbName).command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(collection, query) {
    await this.connect();
    const data = await this.client
      .db(this.dbName)
      .collection(collection)
      .find(query)
      .toArray();
    return data;
  }

  async get(collection, id) {
    await this.connect();
    const _id = new ObjectId(id);
    const data = await this.client
      .db(this.dbName)
      .collection(collection)
      .findOne({ _id });
    return data;
  }

  async create(collection, data) {
    await this.connect();
    const result = await this.client
      .db(this.dbName)
      .collection(collection)
      .insertOne(data);
    return result.insertedId;
  }

  async update(collection, id, data) {
    await this.connect();
    const _id = new ObjectId(id);

    const updatedData = await this.client
      .db(this.dbName)
      .collection(collection)
      .updateOne({ _id }, { $set: data }, { upsert: true });

    return updatedData.upsertedId || id;
  }

  async delete(collection, id) {
    await this.connect();
    const _id = new ObjectId(id);
    await this.client.db(this.dbName).collection(collection).deleteOne({ _id });
    return id;
  }

  async updatePart(collection, id, data) {
    await this.connect();
    const _id = new ObjectId(id);

    const updatedData = await this.client
      .db(this.dbName)
      .collection(collection)
      .updateOne({ _id }, { $set: data }, { upsert: true });

    return updatedData.upsertedId || id;
  }
}

module.exports = MongoLib;
