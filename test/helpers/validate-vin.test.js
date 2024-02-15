import { expect } from 'chai';
import validateVin from '../../src/helpers/validate-vin';

describe('#validateVin()', () => {
  let vin;
  let result;

  context('given a 16 digit VIN', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 18 digit VIN', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P5468188';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with an i', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681i';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with an I', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681I';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with an o', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681o';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with an O', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681O';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with a q', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681q';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a 17 digit VIN with a Q', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B92P54681Q';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a valid VIN with lowercase letters', () => {
    it('passes validation', () => {
      vin = 'wvwuk63b92p546818';
      result = validateVin(vin);

      expect(result).to.be.true;
    });
  });

  context('given a VIN with an incorrect check digit', () => {
    it('fails validation', () => {
      vin = 'WVWUK63B82P546818';
      result = validateVin(vin);

      expect(result).to.be.false;
    });
  });

  context('given a VIN with a correct check digit', () => {
    it('passes validation', () => {
      vin = '11111111111111111';
      result = validateVin(vin);

      expect(result).to.be.true;
    });
  });
});
