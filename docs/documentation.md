# Covid Case Checker

---

A NodeJS/Express API that checks covid cases based on different scales.

This was developed for Team-33 final project for UNC COMP 426 Fall 2022

#

# Data Source

---

Data source for this project is from disease.node.js wrapper developed by the disease.sh.

Disease.sh Documentation: [Documentation](https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_all)

Disease.sh NodeJS Wrapper Documentation: [Documentation](https://www.npmjs.com/package/novelcovid/v/3.0.2)

Disease.sh Github Project: [Project](https://github.com/disease-sh/API)

#

# Installation

---

- Git clone this project to your ubuntu environment:
  
  ```shell
  $ git clone git@github.com:comp426-2022-fall/a99-Team-33.git
  ```
  
- If you do not have node.js and npm installed, please install node.js and npm first:
  
  ```shell
  $ sudo apt update
  $ sudo apt install nodejs
  $ node -v
  $ sudo apt install npm
  ```
  
- Using NPM to install:
  
  ```shell
  $ npm install novelcovid
  $ npm install minimist
  $ npm install express 
  ```
  

#

# API Documentation

---

## Endpoints

---

In this parts of documentation, all the endpoints of the server will be explained. The response body shows which **API path** you need to use. If you want to test it in terminal, you need more information to do this. Check out "[tests](#tests)" section for more testing examples.

In the explanations below, `${PORT}` means the port that the server runs.

For all endpoints except `/app/`, the server supports `--j` for stringnify JSON result. If no `--j` provided, the result will be a nice and user-friendly formatted result by the server. To see the expected stringnify JSON result, check out [JSON Result](#json-result)

###

### /app/

It responds "200 OK".

#### Response body

```shell
curl -s http://localhost:${PORT}/app/
```

#### Expected Output

```shell
200 OK
```

###

### /app/global/

It responds all global data for covid.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/
```

#### Expected Output (Example)

```
            **Covid Global Data Result**
            Request Time: Sat, 03 Dec 2022 03:16:48 GMT
            API Last Updated: 9 minutes, 42 seconds ago
            Total Cases: 649273133
            Today Cases: 60979
            Total Deaths: 6644705
            Today Deaths: 69
            Total Recovered: 626730709
            Today Recovered: 106687
            Total Affected Countries: 230
```

###

### /app/global/yesterday/

It responds all <u>yesterday</u> global data for covid.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/yesterday
```

#### Expected Output (Example)

```
            **Covid Global Data Result Yesterday**
            Request Time: Sat, 03 Dec 2022 03:19:20 GMT
            API Last Updated: 12 minutes, 12 seconds ago
            Total Cases: 649212154
            Yesterday Cases: 416326
            Total Deaths: 6644636
            Yesterday Deaths: 1003
            Total Recovered: 626624022
            Yesterday Recovered: 215417
            Total Affected Countries: 230
```

###

### /app/country/

It responds all current covid data for a specified country.

**Required**: Use `--c <country>` to specify a country

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/
```

#### Expected Output (Example)

```
                    **Covid Data Result of United States**
                    Request Time: Sat, 03 Dec 2022 03:22:19 GMT
                    API Last Updated: 2 minutes, 26 seconds ago
                    Population: 334805269
                    Total Cases: 100787779
                    Today Cases: 0
                    Total Deaths: 1106607
                    Today Deaths: 0
                    Total Recovered: 98236954
                    Today Recovered: 0
```

###

### /app/country/yesterday/

It responds all <u>yesterday</u> covid data for a specifed country.

**Required**: Use `--c <country>` to specify a country.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/yesterday
```

#### Expected Output (Example)

```
                    **Covid Data Result Yesterday of United Kingdom**
                    Request Time: Sat, 03 Dec 2022 03:24:25 GMT
                    API Last Updated: 4 minutes, 33 seconds ago
                    Population: 68497907
                    Total Cases: 24000101
                    Yesterday Cases: 0
                    Total Deaths: 196821
                    Yesterday Deaths: 0
                    Total Recovered: 23747479
                    Yesterday Recovered: 2624              
```

###

### /app/state/

It responds the covid data for specified state in United States.

**Required**: Use `--s <state>` to specify a state.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/state/
```

#### Expected Output (Example)

```
                    **Covid Data Result of North Carolina in United States**
                    Request Time: Sat, 03 Dec 2022 03:27:01 GMT
                    API Last Updated: 7 minutes, 12 seconds ago
                    State Population: 10488084
                    Total Cases: 3275343
                    Today Cases: 0
                    Total Deaths: 27371
                    Today Deaths: 0
                    Total Recovered: 0
```

### /app/state/yesterday/

It responds all the <u>yesterday</u> covid data for specified state in United States.

**Required**: Use `--s <state>` to specify a state.

#### Response body

```shell
curl -s http://localhost:5000/app/state/yesterday/
```

#### Expected Output (Example)

```
                    **Covid Data Result Yesterday of California in United States**
                    Request Time: Sat, 03 Dec 2022 03:29:55 GMT
                    API Last Updated: 5 seconds ago
                    State Population: 39512223
                    Total Cases: 11483568
                    Yesterday Cases: 4819
                    Total Deaths: 97515
                    Yesterday Deaths: 14
                    Total Recovered: 0                 
```

###

### /app/global/historical/

It responds the historical global data for covid.

**Optional**: Use `--d <day>` to specify number of days of historical data. The maximum days for this endpoint is `90` days.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/global/historical/
```

#### Expected Output (Example)

```
**Historical Covid Data (7 days)**
Request Time: Sat, 03 Dec 2022 03:36:15 GMT
{
    "cases": {
        "11/25/22": 641067526,
        "11/26/22": 641337568,
        "11/27/22": 641599490,
        "11/28/22": 642024485,
        "11/29/22": 642749423,
        "11/30/22": 643274699,
        "12/1/22": 644001063
    },
    "deaths": {
        "11/25/22": 6629862,
        "11/26/22": 6630316,
        "11/27/22": 6630837,
        "11/28/22": 6631992,
        "11/29/22": 6633444,
        "11/30/22": 6635022,
        "12/1/22": 6637750
    },
    "recovered": {
        "11/25/22": 0,
        "11/26/22": 0,
        "11/27/22": 0,
        "11/28/22": 0,
        "11/29/22": 0,
        "11/30/22": 0,
        "12/1/22": 0
    }
}
```

###

### /app/country/historical/

It responds the historical covid data for a specified country.

**Required**: Use `--c <country>` to specify a country.

**Optional**: Use `--d <day>` to specify number of days of historical data. The maximum days for this endpoint is `90` days.

#### Response body

```shell
curl -s http://localhost:${PORT}/app/country/historical/
```

#### Expected Output (Example)

```
**Historical Covid Data of France (7 days)**
Request Time: Sat, 03 Dec 2022 03:45:54 GMT
{
    "country": "France",
    "province": [
        "french guiana",
        "french polynesia",
        "guadeloupe",
        "martinique",
        "mayotte",
        "new caledonia",
        "reunion",
        "saint barthelemy",
        "saint pierre and miquelon",
        "st martin",
        "wallis and futuna",
        "mainland"
    ],
    "timeline": {
        "cases": {
            "11/25/22": 37789817,
            "11/26/22": 37789817,
            "11/27/22": 37789817,
            "11/28/22": 37885199,
            "11/29/22": 37979248,
            "11/30/22": 38046448,
            "12/1/22": 38115885
        },
        "deaths": {
            "11/25/22": 159679,
            "11/26/22": 159679,
            "11/27/22": 159679,
            "11/28/22": 159811,
            "11/29/22": 159915,
            "11/30/22": 159990,
            "12/1/22": 160066
        },
        "recovered": {
            "11/25/22": 0,
            "11/26/22": 0,
            "11/27/22": 0,
            "11/28/22": 0,
            "11/29/22": 0,
            "11/30/22": 0,
            "12/1/22": 0
        }
    }
}
```

###

### Tests

In this part of documentation, tests in the terminal will be shown. In order to start checking covid cases by API, you need to start the server also in your argument.

#### An example of terminal by calling `/app/country/historical` API endpoints

```shell
$ PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT --d 7 --c "France" --j; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/country/historical && sleep 5s
```

Specify a port:

```shell
# specify port 6666 for API server listening port
$ PORT="6666"
```

Get a random port in a given range:

```shell
# port range 2000 - 65535
$ PORT="$(shuf -i 2000-65535 -n 1)"
```

Adding flags. Current support of flags are:

- country/region flag: `--c <country>`
  
- days: `--d <day>`
  
- state: `--s <state>`
  
- Stringnify Json result (All existing API endpoints except `/app/` supports this): `--j`
  

```shell
# flags should be added in this part of argument
(timeout --signal=SIGINT 5 node server.js --port=$PORT --d 7 --c "France" --j; exit 0)
```

Specify endpoint to use:

```shell
# modify the endpoint to get different COVID data
curl -s http://localhost:${PORT}/app/country/historical
```

Sleep time after returning the result:

```shell
# sleep for 5 seconds after finishing the result
sleep 5s
```

### JSON Result

If a `--j` flag is given in the shell terminal input, the result will be a stringnified JSON.

####

#### Success

On success, an example JSON like this would be returned (Example of "United States" yesterday covid data):

```
{
    "updated": 1670056733321,
    "country": "USA",
    "countryInfo": {
        "_id": 840,
        "iso2": "US",
        "iso3": "USA",
        "lat": 38,
        "long": -97,
        "flag": "https://disease.sh/assets/img/flags/us.png"
    },
    "cases": 100787779,
    "todayCases": 0,
    "deaths": 1106607,
    "todayDeaths": 0,
    "recovered": 98236954,
    "todayRecovered": 0,
    "active": 1444218,
    "critical": 3495,
    "casesPerOneMillion": 301034,
    "deathsPerOneMillion": 3305,
    "tests": 1141488941,
    "testsPerOneMillion": 3409412,
    "population": 334805269,
    "continent": "North America",
    "oneCasePerPeople": 3,
    "oneDeathPerPeople": 303,
    "oneTestPerPeople": 0,
    "activePerOneMillion": 4313.61,
    "recoveredPerOneMillion": 293415.2,
    "criticalPerOneMillion": 10.44
}
```

####

#### Error

If there is a missing value error for a **required flag** (e.g. use country specified API without giving a country flag), **this will not pass the validation step**. Therefore, it will not make this API call to disease.sh database to decrease unnecessary traffic. Expected return:

```
400 Bad Request
There is no specified country/region found in your input.
```

If the flags are all correct but the value cannot be accepted by disease.sh database, then, there will be a `400 Bad Request` and a error message stringnified JSON returned. Expected return example:

```
400 Bad Request
Country/region "United States1" not found or doesn't have any cases.
{
    "message": "Country not found or doesn't have any cases"
}
```

If there is an error when extracting data from disease.sh in `.then()` (this could be a disease.sh database issue or network issue), there will be a `500 Internal Server Error` given. **This will not return a stringnified JSON. Also, this rarely happens.** Expected return:

```
500 Internal Server Error
There is an error occured in the server when extracting data. Please try again later.
```

#

# Projects Link

Here is the link to this project on Github: [Github Link](https://github.com/comp426-2022-fall/a99-Team-33)