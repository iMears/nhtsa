const axios = require('axios');
const expect = require('chai').expect;
const sinon = require('sinon');
const NhtsaVehicle = require('../index');
const failureJSON = require('./mocked-responses/decode-vin/failure');
const successfulJSON = require('./mocked-responses/decode-vin/success');

describe('NhtsaVehicle', () => {
  let sandbox;
  let json;
  let response;
  let data;
  let vin;

  beforeEach(() => sandbox = sinon.sandbox.create());

  beforeEach(() => {
    const resolved = new Promise(resolve => resolve({ data: json }));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  describe('#decodeVIN()', () => {
    beforeEach(async () => {
      response = await NhtsaVehicle.decodeVIN(vin);
      data = response.data;
    });

    context('with valid VIN', () => {
      vin = '5UXWX7C5*BA';
      json = successfulJSON;

      it('responds with JSON by default', () => {
        expect(typeof response).to.equal('object');
      });

      it('has succssful message', () => {
        expect(data['Message']).to.equal('Results returned successfully');
      });

      xit('has a 200 status code', () => {
        expect(response.status).to.equal(200);
      });

      xit('parses out the type enumeration', () => {
        expect(response.type).to.equal('Minivan');
      });
    });

    context('with invalid VIN', () => {
      vin = 'tacos';
      json = failureJSON;

      it('responds with an error', () => {
        const errorResult = data['Results'].filter(result => result['ValueId'] === '11');
        expect(errorResult.length).to.equal(1);
      });

      it('has meaningful error message', () => {
        const errorResult = data['Results'].filter(result => result['ValueId'] === '11');
        expect(errorResult[0]['Value']).to.include('11- Incorrect Model Year, decoded data may not be accurate!');
      });
    });
  });
});
