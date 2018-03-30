
import { runDynamic as runWithOptionalParameters } from '../commands/command-execute-action';
import { ContextOfButton } from '../context/context-of-button';
import { Settings } from '../commands/settings';
import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';

const logId = 'Cms.Api';

export class Cms extends HasLog {
  /**
   * if true (default) will reset the log everytime something is done
   * if false, will preserve the log over multiple calls
   */
  alwaysResetLog: boolean = true;

  constructor() {
    super(logId, null);
  }

  /**
   * reset / clear the log
   */
  resetLog() {
    this.log = new Log(logId);
  };


  run(context: ContextOfButton,
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | Event,
    event?: Event) {

    this.do(() => runWithOptionalParameters(context, nameOrSettings, eventOrSettings, event));

  }

  /**
   * reset/clear the log if alwaysResetLog is true
   */
  private do(innerCall : Function) {
    if (this.alwaysResetLog)
      this.resetLog();
    return innerCall();
  }

}
