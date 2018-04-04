import { CommandBase } from '../command-base';

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
        code(context) {
          console.log('custom action with code - BETA feature, may change');
          if (!context.button.action.params.customCode) {
            console.warn('custom code action, but no onclick found to run', context.button.action.params);
            return;
          }
          try {
            const fn = new Function('context', 'event', context.button.action.params.customCode); // jshint ignore:line
            fn(context, event);
          } catch (err) {
            console.error('error in custom button-code: ', context.button.action.params);
          }
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Custom();
