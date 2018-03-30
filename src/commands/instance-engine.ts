import { context } from '../context/context';
//import { ContextOfButton } from '../context/context-of-button';
//import { commandCreate } from './command-create';
//import { Commands } from './commands';
import { Settings } from './settings';
import { Cms } from '../cms/Cms';

export class InstanceEngine {
  //commands = Commands.getInstance;
  //context: ContextOfButton;

  constructor(private sxc: SxcInstanceWithInternals) {  }

  // 2dm - don't think this is ever used, disabled for now
  // todo q2stv - do we need this?
  //// todo: stv, check this specialSettings
  //// assemble an object which will store the configuration and execute it
  //create = (context: ContextOfButton, specialSettings: Settings) => {
  //  return commandCreate(context);
  //}

  run(nameOrSettings: string | Partial<Settings>, eventOrSettings?: Partial<Settings> | Event, event?: Event) {
    const cntx = context(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }

}

// 2dm - not sure why we would create a second constructor, doesn't seem to make sense
// todo q2stv - why would we have a second constructor?
//export function instanceEngine(sxc: SxcInstanceWithInternals): InstanceEngine {
//  return new InstanceEngine(sxc);
//}
