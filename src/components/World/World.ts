import {Logger} from 'components/Logger';
import {Dict} from 'dict';

export type World = {
  cities: Dict<string>;
  roads: Dict<string>;
};

/**
 *
 * @param {string} path
 * @returns {World}
 */
export const initWorld = (path: string): World => {
  Logger.warn(path);
  return {cities: {}, roads: {}};
};

/**
 *
 * @param {World} world
 * @returns {string}
 */
export const stringifyWorld = (world: World): string => {
  return '';
};

