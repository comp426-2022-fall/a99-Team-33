#!/usr/bin/env node

/**
 * This file is written for hosting back-end server.
 * User could specify port for listening, default as 5000.
 * 
 * This file should use "export function" from covid-api.js to retrieve data.
 * 
 * return stringify json data if user uses --j flag.
 */

import express from 'express';
import { globalAll, globalYesterdayAll, countryCovidData, countryYesterdayCovidData, statesCovidData, statesYesterdayCovidData, globalHistorical, countryHistorical } from "./lib/covid-api.js";
import minimist from 'minimist';

// set up server
const app = express();
app.use(express.urlencoded({ extended: true }))  // support urlencoded besides JSON

// get user input (terminal)
const args = minimist(process.argv.slice(2));
const port = args.port || 5000

// timestamp difference helper
function timestampFormat(currentTs, updatedTs) {
    /**
     * CurrentTs: the current request UTC timestamp
     * updatedTs: the last updated UTC timestamp of the covid API
     * return: a string showing the time difference
     */

    let diff = Math.floor((currentTs - updatedTs) / 1000)

    // extract day, hr, min, sec
    let day = Math.floor(diff / 86400)
    let hr = Math.floor(diff % 86400 / 3600)
    let min = Math.floor(diff % 86400 % 3600 / 60)
    let sec = diff % 86400 % 3600 % 60

    // construct resultString
    let resultString = ''
    day ? resultString += `${day} days, ` : 0
    hr ? resultString += `${hr} hours, ` : 0
    min ? resultString += `${min} minutes, ` : 0
    resultString += `${sec} seconds ago`

    return resultString
}

// set up endpoints
app.get('/app/', (req, res) => {
    /**
     * /app/ endpoint - Default Status Test
     */
    res.status(200);
    res.send('200 OK');
})

app.get('/app/global/', (req, res) => {
    /**
     * /app/global/ endpoint - All Global Data For Covid
     */
    
    globalAll().then(result => {
        res.status(200);
        if (args.j) {
            res.send(JSON.stringify(result, null, 4));
        } else {
            let dt = new Date();
            
            res.send(`
            **Covid Global Data Result**
            Request Time: ${dt.toUTCString()}
            API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
            Total Cases: ${result['cases']}
            Today Cases: ${result['todayCases']}
            Total Deaths: ${result['deaths']}
            Today Deaths: ${result['todayDeaths']}
            Total Recovered: ${result['recovered']}
            Today Recovered: ${result['todayRecovered']}
            Total Affected Countries: ${result['affectedCountries']}
            `)
        }
    })
    .catch(error => {
        res.status(500)
        res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
    })
})

app.get('/app/global/yesterday/', (req, res) => {
    /**
     * /app/global/yesterday/ endpoint - All Yesterday Global Data For Covid
     */

    res.status(200);
    globalYesterdayAll().then(result => {
        if (args.j) {
            res.send(JSON.stringify(result, null, 4));
        } else {
            let dt = new Date();
            
            res.send(`
            **Covid Global Data Result Yesterday**
            Request Time: ${dt.toUTCString()}
            API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
            Total Cases: ${result['cases']}
            Yesterday Cases: ${result['todayCases']}
            Total Deaths: ${result['deaths']}
            Yesterday Deaths: ${result['todayDeaths']}
            Total Recovered: ${result['recovered']}
            Yesterday Recovered: ${result['todayRecovered']}
            Total Affected Countries: ${result['affectedCountries']}
            `)
        } 
    })
    .catch(error => {
        res.status(500)
        res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
    })
})

app.get('/app/country/', (req, res) => {
    /**
     * /app/country/ endpoint - Specified Country Data for Covid
     */

    // validate country arg
    if (!args.c) {
        res.status(400);
        res.send("400 Bad Request\nThere is no specified country/region found in your input.\n")
    } else {
        countryCovidData(args.c).then(result => {
            // validate results
            if (!result['country']) {
                /**
                * It means the country not found in the API
                */

                res.status(400);
                
                if (args.j) {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n${JSON.stringify(result, null, 4)}`)
                } else {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n`)
                }
            
            } else {
                res.status(200);
                if (args.j) {
                    res.send(JSON.stringify(result, null, 4));
                } else {
                    let dt = new Date();
                    
                    res.send(`
                    **Covid Data Result of ${args.c}**
                    Request Time: ${dt.toUTCString()}
                    API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
                    Population: ${result['population']}
                    Total Cases: ${result['cases']}
                    Today Cases: ${result['todayCases']}
                    Total Deaths: ${result['deaths']}
                    Today Deaths: ${result['todayDeaths']}
                    Total Recovered: ${result['recovered']}
                    Today Recovered: ${result['todayRecovered']}
                    `)
                }
            }
        })
        .catch(error => {
            res.status(500)
            res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
        })
    }
})

app.get('/app/country/yesterday/', (req, res) => {
    /**
     * /app/country/yesterday/ endpoint - Specified Country Yesterday Data for Covid
     */

    // validate country arg
    if (!args.c) {
        res.status(400);
        res.send("400 Bad Request\nThere is no specified country/region found in your input.\n")
    } else {
        countryCovidData(args.c).then(result => {
            // validate results
            if (!result['country']) {
                /**
                * It means the country not found in the API
                */

                res.status(400);
                
                if (args.j) {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n${JSON.stringify(result, null, 4)}`)
                } else {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n`)
                }
            
            } else {
                res.status(200);
                if (args.j) {
                    res.send(JSON.stringify(result, null, 4));
                } else {
                    let dt = new Date();
                    
                    res.send(`
                    **Covid Data Result Yesterday of ${args.c}**
                    Request Time: ${dt.toUTCString()}
                    API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
                    Population: ${result['population']}
                    Total Cases: ${result['cases']}
                    Yesterday Cases: ${result['todayCases']}
                    Total Deaths: ${result['deaths']}
                    Yesterday Deaths: ${result['todayDeaths']}
                    Total Recovered: ${result['recovered']}
                    Yesterday Recovered: ${result['todayRecovered']}
                    `)
                }
            }
        })
        .catch(error => {
            res.status(500)
            res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
        })
    }
})

app.get('/app/state/', (req, res) => {
    /**
     * /app/state endpoint - Specified state (in United States) Data for Covid
     */

    // validate state arg
    if (!args.s) {
        res.status(400);
        res.send("400 Bad Request\nThere is no specified state in United States found in your input.\n")
    } else {
        statesCovidData(args.s).then(result => {
            // validate results
            if (!result['state']) {
                /**
                * It means the state not found in the API
                */

                res.status(400);
                
                if (args.j) {
                    res.send(`400 Bad Request\nState \"${args.s}\" in United States not found or doesn't have any cases.\n${JSON.stringify(result, null, 4)}`)
                } else {
                    res.send(`400 Bad Request\nState \"${args.s}\" in United States not found or doesn't have any cases.\n`)
                }
            
            } else {
                res.status(200);
                if (args.j) {
                    res.send(JSON.stringify(result, null, 4));
                } else {
                    let dt = new Date();
                    
                    res.send(`
                    **Covid Data Result of ${args.s} in United States**
                    Request Time: ${dt.toUTCString()}
                    API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
                    State Population: ${result['population']}
                    Total Cases: ${result['cases']}
                    Today Cases: ${result['todayCases']}
                    Total Deaths: ${result['deaths']}
                    Today Deaths: ${result['todayDeaths']}
                    Total Recovered: ${result['recovered']}
                    `)
                }
            }
        })
        .catch(error => {
            res.status(500)
            res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
        })
    }
})

app.get('/app/state/yesterday/', (req, res) => {
    /**
     * /app/state/yesterday endpoint - Specified state (in United States) Data Yesterday for Covid
     */

    // validate state arg
    if (!args.s) {
        res.status(400);
        res.send("400 Bad Request\nThere is no specified state in United States found in your input.\n")
    } else {
        statesYesterdayCovidData(args.s).then(result => {
            // validate results
            if (!result['state']) {
                /**
                * It means the state not found in the API
                */

                res.status(400);
                
                if (args.j) {
                    res.send(`400 Bad Request\nState \"${args.s}\" in United States not found or doesn't have any cases.\n${JSON.stringify(result, null, 4)}`)
                } else {
                    res.send(`400 Bad Request\nState \"${args.s}\" in United States not found or doesn't have any cases.\n`)
                }
            
            } else {
                res.status(200);
                if (args.j) {
                    res.send(JSON.stringify(result, null, 4));
                } else {
                    let dt = new Date();
                    
                    res.send(`
                    **Covid Data Result Yesterday of ${args.s} in United States**
                    Request Time: ${dt.toUTCString()}
                    API Last Updated: ${timestampFormat(dt.getTime(), result['updated'])}
                    State Population: ${result['population']}
                    Total Cases: ${result['cases']}
                    Yesterday Cases: ${result['todayCases']}
                    Total Deaths: ${result['deaths']}
                    Yesterday Deaths: ${result['todayDeaths']}
                    Total Recovered: ${result['recovered']}
                    `)
                }
            }
        })
        .catch(error => {
            res.status(500)
            res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
        })
    }
})

app.get('/app/global/historical/', (req, res) => {
    /**
     * /app/global/historical/ endpoint - Historical Data Based on Global Timeline
     * Historical timeline is customizable (arg.d for days)
     */

    let pastDays = args.d && args.d <= 90 ? args.d : 30 // default as 30 days
    globalHistorical(pastDays).then(result => {
        res.status(200);
        let warning = args.d && pastDays < args.d ? "WARNING: The maximum days supported currently is 90\n" : "";  // Set a maximum days for historical data otherwise too long for json data.
        if (args.j) {
            res.send(warning + JSON.stringify(result, null, 4));
        } else {
            let dt = new Date();
            res.send(warning + `**Historical Covid Data (${pastDays} days)**\nRequest Time: ${dt.toUTCString()}\n`
            + JSON.stringify(result, null, 4)
            )
        }
    })
    .catch(error => {
        res.status(500)
        res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
    })
})

app.get('/app/country/historical/', (req, res) => {
    /**
     * /app/country/historical/ endpoint - Historical Data Based on specified country Timeline
     * Historical timeline is customizable (arg.d for days)
     */
   
    if (!args.c) {
        res.status(400);
        res.send("400 Bad Request\nThere is no specified country/region found in your input.\n")   
    } else {
        let pastDays = args.d && args.d <= 90 ? args.d : 30 // default as 30 days
        countryHistorical(args.c, pastDays).then(result => {
            // validate results
            if (!result['country']) {
                /**
                * It means the country not found in the API
                */

                res.status(400);

                if (args.j) {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n${JSON.stringify(result, null, 4)}`)
                } else {
                    res.send(`400 Bad Request\nCountry/region \"${args.c}\" not found or doesn't have any cases.\n`)
                }
                
            } else {
                res.status(200);
                let warning = args.d && pastDays < args.d ? "WARNING: The maximum days supported currently is 90\n" : "";  // Set a maximum days for historical data otherwise too long for json data.
                if (args.j) {
                    res.send(warning + JSON.stringify(result, null, 4));
                } else {
                    let dt = new Date();
                    res.send(warning + `**Historical Covid Data of ${args.c} (${pastDays} days)**\nRequest Time: ${dt.toUTCString()}\n`
                    + JSON.stringify(result, null, 4)
                    )
                }
            }
        })
        .catch(error => {
            res.status(500)
            res.send(`500 Internal Server Error\nThere is an error occured in the server when extracting data. Please try again later.\nError Log: ${error}`)
        })
    }
})

app.get('*', (req, res) => {
    /**
     * all non-existent endpoints should return 404.
     */

    res.status(404);
    res.send('404 NOT FOUND');
})

app.listen(port);
