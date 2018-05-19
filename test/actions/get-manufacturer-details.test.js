require('../support/setup');

const axios = require('axios');
const expect = require('chai').expect;
const sinon = require('sinon');
const nhtsa = require('../../nhtsa');
const getManufacturerDetailsSuccessJSON = require('../mocked-responses/get-manufacturer-details/success');

describe('#getManufacturerDetails()', () => {
  let sandbox;
  let response;
  const manufacturer = 'honda'

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(getManufacturerDetailsSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    response = await nhtsa.getManufacturerDetails(manufacturer);
  });

  afterEach(() => sandbox.restore());

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
    expect(response.data['SearchCriteria']).to.equal(null);
  });

  it('has results', () => {
    expect(response.data['Results'].length).to.not.equal(0);
  });
});
