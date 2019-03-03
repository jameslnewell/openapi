import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function load(file: string): any {
  return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
}
