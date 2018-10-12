import {World} from 'components/World';
import {ReadonlyDict} from 'dict';
import {Alien} from 'components/Alien';

export type CommandLineArgs = {
  aliens: number;
  path: string;
};

export type ApplicationState = Readonly<{
  world: World;
  aliens: ReadonlyDict<Alien[]>;
}>;
