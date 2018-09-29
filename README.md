# Invasion [![CircleCI](https://circleci.com/gh/sabau/invasion/tree/master.svg?style=svg)](https://circleci.com/gh/sabau/invasion/tree/master)

Aliens are popping up, will our cities survive?

## Prerequisites

There are two possible ways of running the project:
* nvm
* node (system)

### nvm

`nvm use`

### node

* Required node version 10.11.*
* Required npm version 6.4.*

## Run

`npm start`

It's possible to specify both a path with a valid city map and the number of aliens:
  - `npm run start -- --path=./my/map/file.txt aliens=10`
  
Or only the path to the city file and a random number of aliens
  - `npm run start -- --path=./my/map/file.txt`

A ready to launch example
`npm start -- --path=./src/components/World/fixtures/world`


## Test

`npm test`

## Build

`npm build`
