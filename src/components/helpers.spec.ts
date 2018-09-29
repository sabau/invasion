import {expect} from 'chai';
import {randomInt} from 'components/helperes';

describe('Checking Helpers', () => {
  it('should generate random number within boundaries', () => {
    expect(randomInt(5, 15)).to.be.within(5, 15);
  });
});
