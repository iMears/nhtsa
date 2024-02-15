import '../support/setup';
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import nhtsa from '../../src/nhtsa';
import decodeWmiSuccessJSON from '../mocked-responses/decode-wmi/success';

chai.use(chaiAsPromised);

describe('#decodeWmi()', () => {
  let sandbox;
  let response;
  let data;
  let wmi;

  const validVin = 'WUAAU34248N006164';
  const validWmi = validVin.slice(0, 3);

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const resolved = Promise.resolve(decodeWmiSuccessJSON);
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => sandbox.restore());

  context('with valid WMI', () => {
    beforeEach(async () => {
      wmi = validWmi;
      response = await nhtsa.decodeWmi(wmi);
    });

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
      chai.expect(response.data['SearchCriteria']).to.equal(`WMI:${validWmi}`);
    });

    it('has results', () => {
      chai.expect(response.data['Results'].length).to.not.equal(0);
    });
  });
});
