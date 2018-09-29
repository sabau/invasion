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
 * @param {string[]} directions Textual representation of directions `west=Foo`
 * @returns {City} Object representing the routes from a city to others
 */
export const parseDirections = (directions: string[]) => directions.reduce(
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
 * @param {string} cityText Textual representation of a city
 * @returns {Dict<City>} Single entry of the World, representing this city
 */
export const parseCity = (cityText: string): World => {
  const cityList = cityText.split(' ');
  return cityText.length > 0 ? {[cityList[0]]: {...parseDirections(cityList.slice(1))}} : {};
};

/**
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
 *
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
 *
 * @param {Partial<Routes>} routes
 * @returns {string}
 */
export const stringifyRoutes = (routes?: Partial<Routes>) =>
  routes && Object.keys(routes).length > 0 ?
    ` ${Object.keys(routes).map((direction: Direction) =>
      `${direction}=${routes[direction]}`).join(' ')}` : '';

/**
 *
 * @param {World} world
 * @returns {string}
 */
export const stringifyWorld = (world: World) => {
  return Object.keys(world).map(city => `${city}${stringifyRoutes(world[city])}`).join('\n');
};

/**
 *
 * @param {World} world
 * @param {CityName} city
 * @param {Partial<Routes>} routes
 * @returns {string}
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
 *
 * @param {World} world
 * @param {CityName} city
 * @param {Partial<Routes>} routes
 * @returns {string}
 */
export const destroyCity = (world: World, city: CityName, routes?: Partial<Routes>): World => {
  const newWorld = {
    ...world,
    ...cleanNeighbours(world, city, routes)
  };
  return omit(newWorld, city);
};
