import * as typeis from 'type-is';
import Ajv = require('ajv');
import {Operation, ContentMap} from './Document';
import {Response} from './Response';
import {ErrorArray} from './ErrorArray';
import { load } from './load';

export interface ResponseValidatorOptions {
  ajv?: Ajv.Ajv;
}

export class ResponseValidator {

  private ajv: Ajv.Ajv;
  private operation: Operation;

  public constructor(operation: Operation, options: ResponseValidatorOptions = {}) {
    const {ajv = new Ajv()} = options;
    this.ajv = ajv 
    this.operation = operation;
  }

  public validate(response: Response) {

    // get the response object
    const responseObject = this.operation.responses[String(response.status)] || this.operation.responses.default;
    if (!responseObject) {
      return [{message: `There is no response defined for the "${response.status}" status and no default response.`}];
    }

    // get content object
    const contentType = Object.keys(responseObject.content || {}).find(type => typeis.is(response.headers['content-type'], type));
    const contentObject = responseObject.content[contentType];
    if (!contentObject) {
      return [{message: `There is no response defined for the "${response.headers['content-type']}" type and no default response.`}]; 
    }

    //get schema object
    const schema = contentObject.schema;
    if (!schema) {
      return undefined;
    }

    // validate the schema
    const ajv = new Ajv();
    const valid = ajv.validate(schema, response.body);
    if (!valid) console.log(ajv.errors);

    return undefined;
  }

}
