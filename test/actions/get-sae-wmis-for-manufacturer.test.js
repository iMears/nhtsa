import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/nhtsa';
import getSaeWmisForManufacturerSuccessJSON from '../mocked-responses/get-sae-wmis-for-manufacturer/success';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('#getSaeWmisForManufacturer()', () => {
  let sandbox;
  let response;
  let wmi;

  const validVin = 'WUAAU34248N006164';
  const validWmi = validVin.slice(0, 3);

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(getSaeWmisForManufacturerSuccessJSON);
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

    it('has successful message', () => {
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
