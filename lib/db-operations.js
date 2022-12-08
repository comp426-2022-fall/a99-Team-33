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
const uri = "mongodb+srv://admin:kmx1UR6NVFNH4czP@cluster0.fc0sa82.mongodb.net/maindb?retryWrites=true&w=majority";
// const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

var _db;  // mongodb database

// export modules (used by other modules)
export default {
  // method for connecting to the databases
  connectToServer: async function() {
    // await mongoClient.connect(err => {
    //   // try {
    //   //   _db = mongoClient.db("maindb");
    //   //   console.log(`connect to ${_db}`);
    //   //   // return callback(err);
    //   // } catch {
    //   //   console.log(`Unexpected err connecting to the database ${err}`);
    //   // }

    //   if (err) {
    //     console.log(err);
    //   } else {
    //     _db = mongoClient.db("maindb");
    //     console.log(`connect to ${_db}`);
    //   }
      
    // });

    try {
      await mongoClient.connect();
      await console.log(listDatabases(mongoClient));
      _db = await mongoClient.db("maindb");
    
    } catch (e) {
      console.error(e);
    }
    
  },

  createCollection: async function() {
      // check whether the collection "mycountry" exists (or not)
      console.log(_db);
      await _db.listCollections({name: "mycountry"}).next(function(err, collectionInfo) {
        try {
          if (err) throw err;
          if (!collectionInfo) {
            console.log("Collection not exist")
            // the collection does not exist, create the collection
            _db.createCollection("mycountry", function(err, res) {
              if (err) throw err;
              console.log(`Collection mycountry created.`);
            })
          } else {
            console.log("collection exists")
          }
        } catch {
          console.log(`Unexpected error when checking/creating the collection of 'mycountry' ${err}`);
        }
        
      })   
    
  },

  // method for adding/updating a country for a user
  addCountry: function (countryName) {
    try {
      _db.collection("mycountry").updateOne({
        "_id": _db.mycountry.find().size() + 1,
        "countryName": countryName
      }, {upsert: true});
    } catch {
      console.log("Unexpected error when creating/updating your record to the database.");
    }
  },

  // method for getting country record for a user
  getCountry: function (id) {
    try {
      _db.collection("mycountry").findOne({'_id': id}).then(function(record) {
        if (!record) {
          // no record 
          console.log(record.countryName);
          return null;
        
        return record.countryName;
        }
      })
    } catch {
      console.log("Unexpected error when retrieving data from the database.");
    }
  }

}




