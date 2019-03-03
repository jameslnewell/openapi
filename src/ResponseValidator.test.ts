import {load} from './load';
import {ResponseValidator} from './ResponseValidator';

const document = load(`${__dirname}/__fixtures__/petstore.yaml`)


const operation = document.paths['/pets'].get;
console.log(operation)

const response = {
  status: 200,
  reason: 'Created',
  headers: {
    'content-type': 'application/json'
  },
  body: undefined
};

describe('validateResponse()', () => {
  it('should return an error when the operation does not have a response for the status', () => {
    const validator = new ResponseValidator(operation);
    const errors = validator.validate(response);
    expect(errors).toEqual([
      {
        message: 'There is no response defined for the "201" status and no default response.'
      }
    ]);
  });

  it('should return an error when the operation does not have content for the content type', () => {
    const validator = new ResponseValidator(operation);
    const errors = validator.validate(response);
    expect(errors).toEqual([
      {
        message: 'No response for status 201.'
      }
    ]);
  });

});
