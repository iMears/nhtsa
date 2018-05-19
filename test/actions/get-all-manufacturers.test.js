require('../support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const nhtsa = require('../../nhtsa');
const getAllManufacturersSuccessJSON = require('../mocked-responses/get-parts/success');

chai.use(chaiAsPromised);

describe('#getAllManufacturures()', () => {
  let sandbox;
  let response;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(getAllManufacturersSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    response = await nhtsa.getAllManufacturers();
  });

  afterEach(() => sandbox.restore());

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
    expect(response.data['SearchCriteria']).to.equal('Type: 565 | From Date: 2/3/2018 | To Date: 3/3/2018');
  });

  it('has results', () => {
    expect(response.data['Results'].length).to.not.equal(0);
  });
});
