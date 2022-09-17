import { appendFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import UserProperty from '../entities/UserProperty'

class UserPropertyDAO {
  private _filePath: string;

  constructor(fileName: string) {
    this._filePath = join(__dirname, '..', '..', 'data', fileName);
  }

  set(userProperty: UserProperty) {
    const stringUserProperty = userProperty.key + '=' + userProperty.value + '\n';
    appendFileSync(this._filePath, stringUserProperty);
  }

  get(key: string): string | null {
    const content = this.read();
    const lines = content.split('\n');
    const line = lines.find((currentLine) => {
      const [currentKey, ] = currentLine.split('=');
      return currentKey === key;
    });
    if (line === undefined) {
      return null;
    }
    const [, value] = line.split('=');
    return value;
  }

  read(): string {
    return readFileSync(this._filePath, 'utf-8');
  }

  setCsv() { 
    writeFileSync(this._filePath, '');
  }
}

export default UserPropertyDAO;
