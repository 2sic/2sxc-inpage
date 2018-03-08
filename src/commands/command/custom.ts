﻿import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Custom extends CommandBase {
  constructor() {
    super();
    this.makeDef('custom',
      'Custom',
      'bomb',
      true,
      false,
      {
        code(context, settings) {
          console.log('custom action with code - BETA feature, may change');
          if (!settings.customCode) {
            console.warn('custom code action, but no onclick found to run', settings);
            return;
          }
          try {
            const fn = new Function('settings', 'event', 'sxc', settings.customCode); // jshint ignore:line
            fn(settings, event, context.sxc.sxc);
          } catch (err) {
            console.error('error in custom button-code: ', settings);
          }
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Custom();