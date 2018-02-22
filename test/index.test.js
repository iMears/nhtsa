require('./support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const NHTSAVehicle = require('../index');
const failureJSON = require('./mocked-responses/decode-vin/failure');
const successfulJSON = require('./mocked-responses/decode-vin/success');

chai.use(chaiAsPromised);

describe('NHTSAVehicle', () => {
  let sandbox;
  let json;
  let response;
  let data;
  let vin;

  beforeEach(() => sandbox = sinon.sandbox.create());

  beforeEach(() => {
    const resolved = new Promise(resolve => resolve(json));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    response = await NHTSAVehicle.decodeVIN(vin);
  });

  afterEach(() => sandbox.restore());

  describe('#decodeVIN()', () => {
    context('with valid VIN', () => {
      vin = 'WUAAU34248N006164';
      json = successfulJSON;

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
});
