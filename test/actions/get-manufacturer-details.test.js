import '../support/setup';
import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import nhtsa from '../../src/nhtsa';
import getManufacturerDetailsSuccessJSON from '../mocked-responses/get-manufacturer-details/success';

describe('#getManufacturerDetails()', () => {
  let sandbox;
  let response;
  const manufacturer = 'honda';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(getManufacturerDetailsSuccessJSON);
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

  it('has successful message', () => {
    expect(response.data['Message']).to.equal('Response returned successfully');
  });

  it('has the correct search criteria', () => {
    expect(response.data['SearchCriteria']).to.equal(null);
  });

  it('has results', () => {
    expect(response.data['Results'].length).to.not.equal(0);
  });
});
