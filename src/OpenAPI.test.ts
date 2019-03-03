import {OpenAPI} from './OpenAPI';

describe('OpenAPI()', async () => {
  let openapi = undefined;

  beforeAll(async () => openapi = await OpenAPI.fromFile(`${__dirname}/__fixtures__/petstore.yaml`));

  const request = {
    method: 'get',
    uri: '/',
    headers: {
      'content-type': 'application/json'
    },
    body: undefined
  };

  const response = {
    status: 200,
    reason: 'Created',
    headers: {
      'content-type': 'application/json'
    },
    body: undefined
  };
  
  it('should return an error when the operation does not have a response for the status', () => {
    const match = openapi.match(request, response)
    console.log(match);
  });

  // it.skip('should return an error when the operation does not have content for the content type', () => {
  //   // const validator = new ResponseValidator(operation);
  //   // const errors = validator.validate(response);
  //   // expect(errors).toEqual([
  //   //   {
  //   //     message: 'No response for status 201.'
  //   //   }
  //   // ]);
  // });

});
