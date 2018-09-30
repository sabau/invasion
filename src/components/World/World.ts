import {Dict} from 'dict';
import * as fs from 'fs';
import {omit} from 'lodash';

export type CityName = string;

export type City = Partial<Routes>;

export enum Direction {
  north = 'north',
  south = 'south',
  west = 'west',
  east = 'east'
}

export type Routes = {
  [key in keyof typeof Direction]: CityName;
};

export type World = Dict<City>;

export const removeOpposite: Routes = {
  [Direction.north]: Direction.south,
  [Direction.south]: Direction.north,
  [Direction.east]: Direction.west,
  [Direction.west]: Direction.east
};


/**
 * This function receive an array of `direction=destination` strings where direction in [north,
 * south, west, ovest] and destination is a CityName. It returns an object to represent the roads.
 * @param {string[]} directions Textual representation of directions `west=Foo`
 * @returns {City} Object representing the routes from a city to others
 */
export const parseDirections = (directions: string[]): City => directions.reduce(
  (routes: Routes, route: string) => {
    const routePieces = route.split('=');
    return {
      ...routes,
      ...(routePieces.length === 2 && routePieces[0] in Direction &&
        {[routePieces[0]]: routePieces[1]})
    };
  },
  {});

/**
 * This function parse a string representing a city with its roads and try to return an entry of the
 * World from it.
 *
 * @param {string} cityText Textual representation of a city
 * @returns {Dict<City>} Single entry of the World, representing this city
 */
export const parseCity = (cityText: string): World => {
  const cityList = cityText.split(' ');
  return cityText.length > 0 ? {[cityList[0]]: {...parseDirections(cityList.slice(1))}} : {};
};

/**
 * This function takes a files and try to inizialize a world from its content.
 *
 * @param {string} path Source to read the world, the path will be relative to the project root
 * @returns {World} Representation of the world textually described in the file
 */
export const initWorld = (path: string): World => {
  let worldData = '';
  if (fs.existsSync(path)) {
    worldData = fs.readFileSync(path).toString();
  }
  return worldData.split('\n').reduce(
    (world: World, currentCity: string) => ({...world, ...parseCity(currentCity)}), {});
};

/**
 * This function make a loose validation of the world. It check only that destinations does exists
 * @param {World} world World Object
 * @returns {boolean} True if this world make sense, false otherwise
 */
export const validateWorld = (world: World) => {
  // Every route defined in a city
  return Object.values(world)
    // should ve valid and each destination defined in those routes
    .every((routes: Partial<Routes>) => !!(routes && Object.values(routes)
      // Must point to a city that exists in the map
      .every((destination: CityName) => !!(destination && world[destination]))));
  // TODO: we are not yet checking that Bar north=Foo imply Foo south=Bar
};

/**
 * Return a string that represent the routes in a city object
 *
 * @param {Partial<Routes>} routes
 * @returns {string}
 */
export const stringifyRoutes = (routes?: Partial<Routes>) =>
  routes && Object.keys(routes).length > 0 ?
    ` ${Object.keys(routes).map((direction: Direction) =>
      `${direction}=${routes[direction]}`).join(' ')}` : '';

/**
 * Function to print a textual representation of the world
 *
 * @param {World} world
 * @returns {string}
 */
export const stringifyWorld = (world: World) => {
  return Object.keys(world).map(city => `${city}${stringifyRoutes(world[city])}`).join('\n');
};

/**
 * Cleaning the neighours after a city got destroyed. Here we remove all the routes to the
 * destroyed city, we return only the portion of the world containing the touched cities.
 *
 * @param {World} world
 * @param {CityName} city
 * @param {Partial<Routes>} routes
 * @returns {World}
 */
export const cleanNeighbours = (
  world: World, city: CityName, routes: Partial<Routes> = {}
): World => Object.keys(routes)
  .reduce(
    (prev: World, direction: Direction) => {
      const cityToUpdate: CityName|undefined = routes[direction];
      if (cityToUpdate !== undefined) {
        const newCity = {[cityToUpdate]: omit(world[cityToUpdate], [removeOpposite[direction]])};
        return {
          ...prev,
          ...newCity
        };
      }
      return prev;
    },
    {});

/**
 * This function takes a whole world as argument and, besides removing the city from this world,
 * it also clean the neighbours. It return a full representation of the world with the city deleted.
 *
 * @param {World} world
 * @param {CityName} city
 * @param {Partial<Routes>} routes
 * @returns {World}
 */
export const destroyCity = (world: World, city: CityName, routes?: Partial<Routes>): World => {
  const newWorld = {
    ...world,
    ...cleanNeighbours(world, city, routes)
  };
  return omit(newWorld, city);
};
