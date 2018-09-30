import {CityName, destroyCity, World} from '../World';
import {randomInt} from '../helperes';
import {Dict} from 'dict';
import {Status} from '../../app';
import {Logger} from '../Logger';
import {omit} from 'lodash';

export type Alien = {
  name: number;
  city: CityName;
};

export type AlienMap = Dict<Alien[]>;

/**
 * Here we take care of assigning random cities to the aliens.
 *
 * @param {World} world
 * @param {number} aliens
 * @returns {string}
 */
export const generateAliens = (world: World, aliens: number) => {
  const keys = Object.keys(world);
  let alienMap: Dict<Alien[]> = {};
  for (let i = 0; i < aliens; i++) {
    const newAlien = {name: i, city: keys[randomInt(0, keys.length - 1)]};
    const list = alienMap[newAlien.city];
    alienMap = {
      ...alienMap,
      [newAlien.city]: [...(list ? list : []), newAlien]
    };
  }
  return alienMap;
};

/**
 * In this function all the alien meeting are taken care of. If city contains more than 1 alien,
 * it vanishes, and all the aliens that were there will be deleted too. All neighbours must
 * remove their roads to the destroyed city
 *
 * @param {World} world
 * @param {number} aliens
 * @returns {string}
 */
export const alienMeetings = (aliens: Dict<Alien[]>, world: World): Status =>
  Object.keys(aliens).reduce(
    (prev: Status, city) => {
      const alienList = prev.aliens[city];
      if (alienList && alienList.length > 1) {
        Logger.info(
          `${city} gets destroyed by aliens: ${alienList.map(a => `${a.name}`).join(',')}`);
        return {
          world: destroyCity(prev.world, city, prev.world[city]),
          aliens: omit(prev.aliens, city)
        };
      }
      return {world: prev.world, aliens: prev.aliens};
    },
    {world, aliens});

/**
 * This function takes care of moving the aliens on neighbouring cities, isolated aliens will be
 * eliminated from the alien list.
 *
 * @param {Dict<Alien[]>} aliens
 * @param {World} world
 * @returns {string}
 */
export const moveAliens = (aliens: Dict<Alien[]>, world: World): Dict<Alien[]> => {
  return Object.keys(aliens).reduce(
    (prev: Dict<Alien[]>, city: CityName) => {
      const routes = world[city];
      const aliensCity = aliens[city];
      if (routes && Object.keys(routes).length > 0 && aliensCity && aliensCity[0]) {
        const destinations = Object.values(routes) as CityName[];
        // I know that I have a single alien in this city, or it shuold have been destroyed earlier
        const newCity: CityName = destinations[randomInt(0, destinations.length - 1)];
        const list = prev[newCity];
        // I push the new alien to the city, as last memeber of the list, if any other alien
        // will be there in the next round
        return {...prev, [newCity]: [...(list ? list : []), aliensCity[0]]};
      }
      // We can forget about those aliens, they will never meet anyone if the city has no routes
      return prev;
    },
    {});
};
