import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/nhtsa';
import getAllMakesSuccessJSON from '../mocked-responses/get-all-makes/success';

chai.use(chaiAsPromised);

describe('#getAllMakes()', () => {
  let sandbox;
  let response;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(getAllMakesSuccessJSON);
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  beforeEach(async () => {
    response = await nhtsa.getAllMakes();
  });

  it('responds with a 200 status code', () => {
    chai.expect(response.status).to.equal(200);
  });

  it('parses the JSON response', () => {
    chai.expect(typeof response).to.equal('object');
  });

  it('has successful message', () => {
    chai.expect(response.data['Message']).to.equal('Response returned successfully');
  });

  it('has the correct search criteria', () => {
    chai.expect(response.data['SearchCriteria']).to.equal(null);
  });

  it('has results', () => {
    chai.expect(response.data['Results'].length).to.not.equal(0);
  });
});
