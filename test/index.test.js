require('./support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const NHTSAVehicle = require('../index');
const decodeVinSuccessJSON = require('./mocked-responses/decode-vin/success');
const decodeVinFlatFormatSuccessJSON = require('./mocked-responses/decode-vin-flat-format/success');
const decodeVinExtendedSuccessJSON = require('./mocked-responses/decode-vin-extended/success');
const decodeVinExtendedFlatFormatSuccessJSON = require('./mocked-responses/decode-vin-extended-flat-format/success');

chai.use(chaiAsPromised);

describe('NHTSAVehicle', () => {
  let sandbox;
  let response;
  let json;
  let data;
  let vin;

  const validVin = 'WUAAU34248N006164';
  const invalidVin = 'invalidVIN';

  beforeEach(() => sandbox = sinon.sandbox.create());

  beforeEach(() => {
    const resolved = new Promise(resolve => resolve(json));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  describe('#decodeVinExtendedFlatFormat()', () => {
    json = decodeVinExtendedFlatFormatSuccessJSON;

    beforeEach(async () => {
      vin = validVin;
      response = await NHTSAVehicle.decodeVinExtendedFlatFormat(vin);
    });

    context('with valid VIN', () => {
      it('responds with a 200 status code', () => {
        expect(response.status).to.equal(200);
      });

      it('responds with JSON by default', () => {
        expect(typeof response).to.equal('object');
      });

      it('has succssful message', () => {
        expect(response.data['Message']).to.equal('Results returned successfully');
      });
    });

    context('with invalid VIN', () => {
      beforeEach(() => {
        vin = invalidVin;
        response = NHTSAVehicle.decodeVinExtendedFlatFormat(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });


  describe('#decodeVinExtended()', () => {
    json = decodeVinExtendedSuccessJSON;

    beforeEach(async () => {
      vin = validVin;
      response = await NHTSAVehicle.decodeVinExtended(vin);
    });

    context('with valid VIN', () => {
      it('responds with a 200 status code', () => {
        expect(response.status).to.equal(200);
      });

      it('responds with JSON by default', () => {
        expect(typeof response).to.equal('object');
      });

      it('has succssful message', () => {
        expect(response.data['Message']).to.equal('Results returned successfully');
      });
    });

    context('with invalid VIN', () => {
      beforeEach(() => {
        vin = invalidVin;
        response = NHTSAVehicle.decodeVinExtended(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });

  describe('#decodeVin()', () => {
    json = decodeVinSuccessJSON;

    beforeEach(async () => {
      vin = validVin;
      response = await NHTSAVehicle.decodeVin(vin);
    });

    context('with valid VIN', () => {
      it('responds with a 200 status code', () => {
        expect(response.status).to.equal(200);
      });

      it('responds with JSON by default', () => {
        expect(typeof response).to.equal('object');
      });

      it('has succssful message', () => {
        expect(response.data['Message']).to.equal('Results returned successfully');
      });
    });

    context('with invalid VIN', () => {
      beforeEach(() => {
        vin = invalidVin;
        response = NHTSAVehicle.decodeVin(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });

  describe('#decodeVinFlatFormat()', () => {
    json = decodeVinFlatFormatSuccessJSON;

    context('with valid VIN', () => {
      beforeEach(async () => {
        vin = validVin;
        response = await NHTSAVehicle.decodeVinFlatFormat(vin);
      });

      it('responds with a 200 status code', () => {
        expect(response.status).to.equal(200);
      });

      it('responds with JSON by default', () => {
        expect(typeof response).to.equal('object');
      });

      it('has succssful message', () => {
        expect(response.data['Message']).to.equal('Results returned successfully');
      });
    });

    context('with invalid VIN', () => {
      beforeEach(() => {
        vin = invalidVin;
        response = NHTSAVehicle.decodeVinFlatFormat(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });
});
