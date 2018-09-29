import {Logger} from 'components/Logger';
import {Dict} from 'dict';
import * as fs from 'fs';

export type CityName = string;

// We will destroy cities but not routes from neightbours. They will be lazily removed once
// someone try to reach that city.
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

export const parseCity = (cityText: string): World => {
  const cityList = cityText.split(' ');
  return cityText.length > 0 ? {[cityList[0]]: {...parseDirections(cityList.slice(1))}} : {};
};

/**
 *
 * @param {string} path
 * @returns {World}
 */
export const initWorld = (path: string): World => {
  let worldData = '';
  if (fs.existsSync(path)) {
    worldData = fs.readFileSync(path).toString();
  }
  return worldData.split('\n').reduce(
    (world: World, currentCity: string) => ({...world, ...parseCity(currentCity)}), {});
};

export const validateWorld = (world: World) => {
  // Every route defined in a city
  return Object.values(world)
    // should ve valid and each destination defined in those routes
    .every(routes => !!(routes && Object.values(routes)
      // Must point to a city that exists in the map
      .every((destination) => !!(destination && world[destination]))));
};

/**
 *
 * @param {World} world
 * @returns {string}
 */
export const stringifyWorld = (world: World): string => {
  return '';
};

