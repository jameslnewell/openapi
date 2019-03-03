
export interface HeaderMap {
  // TODO:
}

export interface Content {
  schema?: any;
  example?: any;
  examples?: any;
  encoding?: any;
}

export interface ContentMap {
  [type: string]: Content;
}

export interface Parameter {
  // TODO:
}

export interface RequestBody {
  // TODO:
}

export interface Response {
  description: string;
  headers?: HeaderMap;
  content?: ContentMap;
  links?: any;
}

export interface ResponseMap {
  default?: Response;
  [code: string]: Response;
}

export interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: any; // TODO:
  operationId?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody 
  responses: ResponseMap;
  callbacks?: any; // TODO:
  deprecated?: boolean;
  security?: any; // TODO: 
  servers?: any; // TODO:
}

export interface Information {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: any; // TODO:
  license?: string;
  version: string;
}

export interface Path {
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  servers?: any; // TODO:
  parameters?: Parameter[];
}

export interface PathMap {
  [path: string]: Path;
}

export interface Document {
  openapi: string;
  info: Information;
  paths: PathMap;
}