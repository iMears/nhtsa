require('../support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const nhtsa = require('../../nhtsa');
const getSaeWmisForManufacturerSuccessJSON = require('../mocked-responses/get-sae-wmis-for-manufacturer/success');

chai.use(chaiAsPromised);

describe('#getSaeWmisForManufacturer()', () => {
  let sandbox;
  let response;
  let data;
  let wmi;

  const validVin = 'WUAAU34248N006164';
  const validWmi = validVin.slice(0, 3);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(getSaeWmisForManufacturerSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  context('with valid WMI', () => {
    beforeEach(async () => {
      wmi = validWmi;
      response = await nhtsa.getSaeWmisForManufacturer(wmi);
    });

    it('responds with a 200 status code', () => {
      expect(response.status).to.equal(200);
    });

    it('parses the JSON response', () => {
      expect(typeof response).to.equal('object');
    });

    it('has succssful message', () => {
      expect(response.data['Message']).to.equal('Response returned successfully');
    });

    it('has the correct search criteria', () => {
      expect(response.data['SearchCriteria']).to.equal('Manufacturer: audi');
    });

    it('has results', () => {
      expect(response.data['Results'].length).to.not.equal(0);
    });
  });
});
