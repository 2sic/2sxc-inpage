import { CommandBase } from '../command-base';

export class Custom extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('custom', 'Custom', 'bomb', true, false, {
      code(settings, event, sxc) {
        console.log('custom action with code - BETA feature, may change');
        if (!settings.customCode) {
          console.warn('custom code action, but no onclick found to run', settings);
          return;
        }
        try {
          const fn = new Function('settings', 'event', 'sxc', settings.customCode); // jshint ignore:line
          fn(settings, event, sxc);
        } catch (err) {
          console.error('error in custom button-code: ', settings);
        }
      },
    });
  }
}
