import { Engine } from '../commands/engine';
import { ContextOfButton } from '../context/context-of-button';
import { Settings } from '../commands/settings';
import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';

const logId = 'Cms.Api';
const dumpLog = true;

export class Cms extends HasLog {
  /**
   * if true (default) will reset the log everytime something is done
   * if false, will preserve the log over multiple calls
   */
  autoReset: boolean = true;
  autoDump: boolean = dumpLog;

  constructor() {
    super(logId, null);
  }

  /**
   * reset / clear the log
   */
  resetLog() {
    this.log = new Log(logId, null, 'log was reset');
  };


  run(context: ContextOfButton,
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | Event,
    event?: Event) {

    this.do(() => new Engine(this.log).detectParamsAndRun(context, nameOrSettings, eventOrSettings, event));

  }

  /**
   * reset/clear the log if alwaysResetLog is true
   */
  private do(innerCall : Function) {
    if (this.autoReset) this.resetLog();
    console.log('before');
    const result = innerCall();
    console.log('after');
    if (this.autoDump) console.log(this.log.dump());
    return result;
  }

}
