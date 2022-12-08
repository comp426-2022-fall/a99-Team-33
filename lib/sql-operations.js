/**
 * This file is written for processing any database related operations.
 * This is not the file for backend server API for the server.
 * 
 * Functions in this file should be all "export function".
 * 
 * Currently use mongodb for database, documentation: https://www.sqlite.org/index.html
 * Use mongodb npm package, documentation: https://www.npmjs.com/package/sqlite3
 * 
 */

 import sqlite3 from 'better-sqlite3';
import { query } from 'express';

// set up better-sqlite3
const logsDB = sqlite3('./db/logs.db');

// export modules (used by other modules)
export default {
    // // methods for connecting to a database
    // connectToDB: function() {
    //     logdb = sqlite.Database('../db/logs.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    //         if (err && err.code == "SQLITE_CANTOPEN") {
    //             // the database is null (does not exist)

    //             function createDatabase() {
                    
    //             }


    //             createDatabase();

    //         } else if (err) {
    //             // unexpected err
    //             return console.error(err.message);
    //         }
        
    //         console.log('Connected to the SQLite database "logs.db" successfully.');
    //     })
    // },

    checkTableNotExistence: function(tableName) {
        // double check table existence
        const stmt = logsDB.prepare(`SELECT name FROM sqlite_schema WHERE type='table' and name = '${tableName}';`);

        // get result of the stmt query
        let result = stmt.get()

        return result === undefined
    },

    createLogTable: function(tableName) {
        console.log('Table does not exist in the database. Creating the table now...')

        const queryCreateTable = `CREATE TABLE ${tableName} (id INTEGER NOT NULL PRIMARY KEY, time TEXT NOT NULL, status TEXT NOT NULL, endpoint TEXT NOT NULL, detail TEXT);`

        logsDB.exec(queryCreateTable);
    },
    
    // method for inserting logs to logs.db
    insertLog: function(status, endpointName, detail) {
        let tableName = 'backendlog'  // this must be fixed in the code, NOT by user to prevent sql injection.
        
        // check table existence and create log table if needed
        if (this.checkTableNotExistence(tableName)) {
            // 'backendlog' table not found
            
            this.createLogTable(tableName);
        }

        // insert the record into db
        let dt = new Date();
        const queryInsertLog = `INSERT INTO ${tableName} (time, status, endpoint, detail) VALUES ('${dt.toUTCString()}', '${status}', '${endpointName}', '${detail}');`
        
        logsDB.exec(queryInsertLog);

    },

    // method for getting logs from logs.db
    retrieveLog: function() {
        let tableName = 'backendlog'  // this must be fixed in the code, NOT by user to prevent sql injection.
        
        // check table existence and create log table if needed
        if (this.checkTableNotExistence(tableName)) {
            // 'backendlog' table not found
            
            this.createLogTable(tableName);
        }

        // retrieve the record into db, maximum of 10
        const queryRetrieveLog = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 10;`
        let stmt = logsDB.prepare(queryRetrieveLog);
        let result = stmt.all();

        return result;
    },

    // drop log table from logs.db
    dropTableLog: function() {
        try {
            let tableName = 'backendlog'
            const queryDropTableLog = `DROP TABLE ${tableName};`
            logsDB.exec(queryDropTableLog);
        } catch (err) {
            console.error(err);
        }
    },

    // truncate all records in the log table
    truncateTableLog: function() {
        try {
            // delete all records first
            let tableName = 'backendlog'
            const queryTruncateTableLog = `DELETE FROM ${tableName};`
            logsDB.exec(queryTruncateTableLog);

            // delete the sequence (auto-incrementing id)
            // const queryResetIndexLog = `DELETE FROM SQLITE_SEQUENCE WHERE name = '${tableName}';`
            // logsDB.exec(queryResetIndexLog);

        } catch (err) {
            console.error(err);
        }
    }

}




