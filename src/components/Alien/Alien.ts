import {CityName, World} from 'components/World/World';
import {randomInt} from 'components/helperes';
import {Dict} from 'dict';

export type Alien = {
  name: number;
  city: CityName;
};

export type AlienMap = Dict<Alien[]>;

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
