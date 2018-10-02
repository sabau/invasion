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

# Description

We receive a file with the format defined in ./src/components/World/fixtures/world and a number of aliens to generate. Those aliens, once they met, destroy the city of the meeting and themselves. Movements and initial deployment are totally random, but must follow the world structure.
At each meeting we should print the destroyed city along with the aliens that met. 
We can iterate until we have aliens or cities, at maximum 10000 iterations can occur.
Once the iterations are over the final status of the world have to be printed.

## Assumptions

* File size:
  * Max file size 1GB for 64bit systems, 512MB for 32 bit systems (max hadled size by fs)
  * Max length of the city file: (2^53) -1 characters (max string legth)
* World structure:
  * Routes are bidirectional, but must be defined at both ends
  * The cities never have roads that goes to non-existing cities
  * Rigid world routes: A road coming from north must have been started from south, so on for the other directions
  * Each city can have up to 4 routes: north, west, south and east
* Aliens structure:
  * Aliens are grouped together per city, if a group have more than 1 alien, it disappear along with its city
  * They move synchronously, we check the meetings only at the end of the round, not intermediate results
  * The initial distribution must be checked, to eventually destroy cities with multiple aliens
  * There is no correlation between number of cities and number of aliens
  * Once an alien find itself in an isolated city, he can be dropped as he won't interfere with others anymore
