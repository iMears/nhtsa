require('../support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const NHTSA = require('../../nhtsa');
const decodeWmiSuccessJSON = require('../mocked-responses/decode-wmi/success');

chai.use(chaiAsPromised);

describe('#decodeWmi()', () => {
  let sandbox;
  let response;
  let data;
  let wmi;

  const validVin = 'WUAAU34248N006164';
  const validWmi = validVin.slice(0, 3);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(decodeWmiSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  context('with valid VIN', () => {
    beforeEach(async () => {
      wmi = validWmi;
      response = await NHTSA.decodeWmi(wmi);
    });

    it('responds with a 200 status code', () => {
      expect(response.status).to.equal(200);
    });

    it('parses the JSON response', () => {
      expect(typeof response).to.equal('object');
    });

    it('has succssful message', () => {
      expect(response.data['Message']).to.equal('Results returned successfully');
    });

    it('has the correct search criteria', () => {
      expect(response.data['SearchCriteria']).to.equal('WMI:WUA');
    });
  });
});
