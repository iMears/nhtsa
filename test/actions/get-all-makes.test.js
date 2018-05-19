require('../support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const nhtsa = require('../../nhtsa');
const getAllMakesSuccessJSON = require('../mocked-responses/get-all-makes/success');

chai.use(chaiAsPromised);

describe('#getAllMakes()', () => {
  let sandbox;
  let response;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(getAllMakesSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  beforeEach(async () => {
    response = await nhtsa.getAllMakes();
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
    expect(response.data['SearchCriteria']).to.equal(null);
  });

  it('has results', () => {
    expect(response.data['Results'].length).to.not.equal(0);
  });
});
