const expect = require('chai').expect;
const validateFormat = require('../../helpers/validate-format');

describe('#validateFormat()', () => {
  let format;

  context('valid formats', () => {
    context('given JSON format', () => {
      it('passes validation', () => {
        format = 'JSON';
        result = validateFormat(format);

        expect(result).to.be.true;
      });
    });

    context('given JSV format', () => {
      it('passes validation', () => {
        format = 'JSV';
        result = validateFormat(format);

        expect(result).to.be.true;
      });
    });

    context('given CSV format', () => {
      it('passes validation', () => {
        format = 'CSV';
        result = validateFormat(format);

        expect(result).to.be.true;
      });
    });

    context('given XML format', () => {
      it('passes validation', () => {
        format = 'XML';
        result = validateFormat(format);

        expect(result).to.be.true;
      });
    });

    context('given lower case format', () => {
      it('passes validation', () => {
        format = 'xml';
        result = validateFormat(format);

        expect(result).to.be.true;
      });
    });

  });

  context('invalid formats', () => {
    context('given no input', () => {
      it('fails validation', () => {
        format = null;
        result = validateFormat(format);

        expect(result).to.be.false;
      });
    });

    context('given an empty string', () => {
      it('fails validation', () => {
        format = '';
        result = validateFormat(format);

        expect(result).to.be.false;
      });
    });

    context('given a number', () => {
      it('fails validation', () => {
        format = 007;
        result = validateFormat(format);

        expect(result).to.be.false;
      });
    });

    context('given a JPEG format', () => {
      it('fails validation', () => {
        format = 'JPEG';
        result = validateFormat(format);

        expect(result).to.be.false;
      });
    });

    context('given an unsupported format', () => {
      it('fails validation', () => {
        format = '\n';
        result = validateFormat(format);

        expect(result).to.be.false;
      });
    });
  });
});
