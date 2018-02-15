import { CommandDefinition } from './definition';

export class Commands {
  commandList: CommandDefinition[];
  list: () => { }; // hash - table of action definitions, to be used a list()["action - name"]
  get: (name: string) => {} ; // a specific action definition
}
