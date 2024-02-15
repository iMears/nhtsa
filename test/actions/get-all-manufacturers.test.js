import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/nhtsa';
import getAllManufacturersSuccessJSON from '../mocked-responses/get-parts/success';

chai.use(chaiAsPromised);

describe('#getAllManufacturures()', () => {
  let sandbox;
  let response;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(getAllManufacturersSuccessJSON);
    sandbox.stub(axios, 'get').returns(resolved);
  });

  beforeEach(async () => {
    response = await nhtsa.getAllManufacturers();
  });

  afterEach(() => sandbox.restore());

  it('responds with a 200 status code', () => {
    chai.expect(response.status).to.equal(200);
  });

  it('parses the JSON response', () => {
    chai.expect(typeof response).to.equal('object');
  });

  it('has successful message', () => {
    chai.expect(response.data['Message']).to.equal('Results returned successfully');
  });

  it('has the correct search criteria', () => {
    chai.expect(response.data['SearchCriteria']).to.equal('Type: 565 | From Date: 2/3/2018 | To Date: 3/3/2018');
  });

  it('has results', () => {
    chai.expect(response.data['Results'].length).to.not.equal(0);
  });
});
