/**
 * This file is written for processing any database related operations.
 * This is not the file for backend server API for the server.
 * 
 * Functions in this file should be all "export function".
 * 
 * Currently use mongodb for database, documentation: https://cloud.mongodb.com/
 * Use mongodb npm package, documentation: https://www.npmjs.com/package/mongodb
 * 
 */

 import { MongoClient } from 'mongodb';

// set up mongodb
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:kmx1UR6NVFNH4czP@clusterName.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




