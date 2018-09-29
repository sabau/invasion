import {expect} from 'chai';
import {randomInt} from 'components/helperes';

describe('Checking Helpers', () => {
  it('should generate random number within boundaries', () => {
    const nr = randomInt(5, 15)
    expect(nr).to.be.within(5, 15);
  });
});
