import { context } from '../context/context';
//import { ContextOfButton } from '../context/context-of-button';
//import { commandCreate } from './command-create';
//import { Commands } from './commands';
import { Settings } from './settings';
import { Cms } from '../cms/Cms';

export class InstanceEngine {

  constructor(private sxc: SxcInstanceWithInternals) {  }

  run(nameOrSettings: string | Partial<Settings>, eventOrSettings?: Partial<Settings> | Event, event?: Event) {
    const cntx = context(this.sxc);
    return new Cms().run(cntx, nameOrSettings, eventOrSettings, event);
  }

}
