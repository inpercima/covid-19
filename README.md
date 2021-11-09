# COVID-19

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

Coronavirus (COVID-19) cases in Germany, Saxony and Leipzig.

This app is online under [covid-19.inpercima.net](http://covid-19.inpercima.net).

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 2.3.1.

## Prerequisites

### Angular CLI

* `angular-cli 13.0.1` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 16.13.0` or higher in combination with
  * `npm 8.1.0` or higher or
  * `yarn 1.22.11` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | current version | last version | reason |
| ---------- | --------------- | ------------ | ------ |
| rxjs       | 6.5.3           | 7.4.0        | "ng2-charts@2.4.3" has incorrect peer dependency "rxjs@^6.3.3" and @"angular/core@13.0.0" has incorrect peer dependency "rxjs@^6.5.3 \|\| ^7.4.0" |
| chart.js   | 2.9.4           | 3.6.0        | "ng2-charts@2.4.3" has incorrect peer dependency "chart.js@^2.9.3" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/covid-19/
cd covid-19
```

## Usage

### Modules

For the client check [covid-19 - client](./client).

For the server check [covid-19 - api](./api).
