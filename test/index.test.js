require('./support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const NHTSAVehicle = require('../index');
const decodeVinSuccessJSON = require('./mocked-responses/decode-vin/success');
const decodeVinFlatFormatSuccessJSON = require('./mocked-responses/decode-vin-flat-format/success');

chai.use(chaiAsPromised);

describe('NHTSAVehicle', () => {
  let sandbox;
  let response;
  let json;
  let data;
  let vin = 'WUAAU34248N006164';

  beforeEach(() => sandbox = sinon.sandbox.create());

  beforeEach(() => {
    const resolved = new Promise(resolve => resolve(json));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  describe('#decodeVIN()', () => {
    json = decodeVinSuccessJSON;

    beforeEach(async () => {
      response = await NHTSAVehicle.decodeVIN(vin);
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
        vin = 'tacos';
        response = NHTSAVehicle.decodeVIN(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });

  describe('#decodeVINFlatFormat()', () => {
    json = decodeVinFlatFormatSuccessJSON;

    context('with valid VIN', () => {
      beforeEach(async () => {
        vin = 'WUAAU34248N006164';
        response = await NHTSAVehicle.decodeVINFlatFormat(vin);
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
        vin = 'tacos';
        response = NHTSAVehicle.decodeVINFlatFormat(vin);
      });

      it('responds with an error', () => {
        expect(response).to.be.rejectedWith('Invalid VIN');
      });
    });
  });
});
