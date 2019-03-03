import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as yaml from 'js-yaml';
import Ajv = require("ajv");
import {Request} from "./Request";
import {Response} from "./Response";
import { Document, Operation } from "./Document";

const readFile = util.promisify(fs.readFile);

interface OpenAPIMatch {
  operation: Operation;
  parameters: {[name: string]: string;};
  validateRequest();
  validateResponse();
}

type Method = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';

const supportedMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']

function isSupportedMethod(method: string): method is Method {
  return supportedMethods.includes(method);
}

export class OpenAPI {

  public static async fromFile(file: string): Promise<OpenAPI> {
    const contents = await readFile(file, 'utf-8');
    if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
      return OpenAPI.fromObject(yaml.safeLoad(contents));
    } else {
      return OpenAPI.fromObject(JSON.parse(contents));
    }
  }

  public static async fromObject(object: any): Promise<OpenAPI> {
    // TODO: validate
    return new OpenAPI(object as Document);
  }

  private ajv: Ajv.Ajv;
  public readonly document: Document;

  private constructor(document: Document) {
    this.document = document;
  }

  public match(request: Request, response: Response): OpenAPIMatch | undefined {
    const {uri, method} = request;

    // get the path object for the request and respose
    const pathObject = this.document.paths[uri]; // TODO: support variables
    if (!pathObject) {
      return undefined;
    }

    // get the operation object for the request
    if (!isSupportedMethod(method)) {
      console.log(isSupportedMethod(method), uri, method)
      return undefined;
    }
    const operationObject = pathObject[method];
    console.log(operationObject)

    return undefined;
  }

}
