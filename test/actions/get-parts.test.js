require('../support/setup');

const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const nhtsa = require('../../nhtsa');
const getPartsSuccessJSON = require('../mocked-responses/get-parts/success');

chai.use(chaiAsPromised);

describe('#getParts()', () => {
  let sandbox;
  let response;
  const type = 565;
  let toDate = new Date();
  let fromDate = new Date();

  fromDate.setMonth(toDate.getMonth() - 1);

  toDate = toDate.toLocaleDateString('en-US'); // '3/3/2018';
  fromDate = fromDate.toLocaleDateString('en-US'); // '2/3/2018';

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise(resolve => resolve(getPartsSuccessJSON));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    const options = [type, toDate, fromDate];
    response = await nhtsa.getParts(...options);
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
