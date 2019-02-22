import {expect} from 'chai';
import {
  cleanNeighbours,
  destroyCity,
  initWorld,
  parseCity,
  parseDirections,
  stringifyRoutes,
  stringifyWorld,
  validateWorld
} from './World';

describe('Checking World', () => {
  describe('Ability to import world', () => {

    it('Should get empty world with empty string', () => {
      const worldObject = initWorld('');
      expect(worldObject).to.be.deep.equal({});
    });

    it('Should parse directions', () => {
      const worldObject = parseDirections(['west=Foo', 'east=Bar']);
      expect(worldObject).to.be.deep.equal({west: 'Foo', east: 'Bar'});
    });


    it('Should ignore wrong directions when parsing them', () => {
      const worldObject = parseDirections(['westt=Foo', 'east=Bar']);
      expect(worldObject).to.be.deep.equal({east: 'Bar'});
    });

    it('Should override duplicated directions when parsing them', () => {
      const worldObject = parseDirections(['west=Foo', 'west=Bar']);
      expect(worldObject).to.be.deep.equal({west: 'Bar'});
    });

    it('Should parseCity', () => {
      const worldObject = parseCity('Foo');
      expect(worldObject).to.be.deep.equal({Foo: {}});
    });

    it('Should parseCity with directions', () => {
      const worldObject = parseCity('Foo west=Bar');
      expect(worldObject).to.be.deep.equal({Foo: {west: 'Bar'}});
    });

    it('Should get a proper world', () => {
      const worldObject = initWorld('fixtures/world-looping');
      expect(worldObject).to.be.deep.equal({Foo: {north: 'Bar'}, Bar: {south: 'Foo'}});
    });

    it('Should accept valid world', () => {
      const worldObject = initWorld('fixtures/world-looping');
      expect(validateWorld(worldObject)).to.be.true;
    });

    it('Should reject invalid world', () => {
      const worldObject = initWorld('fixtures/world-inconsistent');
      expect(validateWorld(worldObject)).to.be.false;
    });

  });

  describe('Ability to destroy the world', () => {
    it('Should clean neighbours cities if asked to', () => {
      const worldObject = {Foo: {north: 'Bar'}, Bar: {south: 'Foo'}};
      expect(cleanNeighbours(worldObject, 'Bar', worldObject.Bar)).to.be.deep.equal({Foo: {}});
    });
    it('Should kill a city invalid world', () => {
      const worldObject = {Foo: {north: 'Bar'}, Bar: {south: 'Foo'}};
      expect(destroyCity(worldObject, 'Bar', worldObject.Bar)).to.be.deep.equal({Foo: {}});
    });
  });

  describe('Ability to print the world', () => {

    it('should print an empty string if fed with empty world', () => {
      const worldString = stringifyWorld({});
      expect(worldString).to.be.equal('');
    });

    it('should print an easy world string if fed with looping world', () => {
      const worldString = stringifyWorld({Foo: {north: 'Bar'}, Bar: {south: 'Foo'}});
      expect(worldString).to.be.equal('Foo north=Bar\nBar south=Foo');
    });

    it('should print an empty string if fed with empty routes', () => {
      const worldString = stringifyRoutes({});
      expect(worldString).to.be.equal('');
    });

    it('should print a single route if fed with a single route', () => {
      const worldString = stringifyRoutes({north: 'Bar'});
      expect(worldString).to.be.equal(' north=Bar');
    });
  });
});
