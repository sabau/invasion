# Invasion [![CircleCI](https://circleci.com/gh/sabau/invasion/tree/master.svg?style=svg)](https://circleci.com/gh/sabau/invasion/tree/master)

Aliens are popping up, will the cities of world X survive?

## Prerequisites

There are two ways of running the project:
* nvm
* node (system)

### nvm

To switch to the right version of node use:

`nvm use`

### node

* Required node version 10.11.*
* Required npm version 6.4.*

## Install
 
To install the project it's sufficient to run:

`npm i`

## Run

To run a simulation you should run, with the proper parameters, the command:

`npm start`

* --path=./relative/path/to/world.txt
* --aliens=1000 (optional) number of aliens in the simulation

It's possible to specify both a path with a valid city map and the number of aliens:
  - `npm run start -- --path=./my/map/file.txt aliens=10`
  
Or only the path to the city file and a random number of aliens
  - `npm run start -- --path=./my/map/file.txt`

A ready to launch example
`npm start -- --path=./src/components/World/fixtures/world`


## Test

In order to run all the tests you may run:

`npm test`

## Build

To have a version running in pure JS, along with the definitions file, to build an exportable package, you can run:

`npm build`
