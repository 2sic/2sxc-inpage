import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class ContentItems extends CommandBase {
  constructor() {
    super();
    this.makeDef('contentitems',
      'ContentItems',
      'table',
      true,
      false,
      {
        params: (context) => {
          return { contentTypeName: context.contentBlock.contentTypeId };
        },
        // ReSharper disable once UnusedParameter
        showCondition: (context, settings) => {
          return context.user.canDesign && (settings.contentType || context.contentBlock.contentTypeId);
        },
        configureCommand: (context, cmd) => {
          if (cmd.settings.contentType) // optionally override with custom type
            cmd.params.contentTypeName = cmd.settings.contentType;
          // maybe: if item doesn't have a type, use that of template
          // else if (cmdSpecs.contentTypeId)
          //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
          if (cmd.settings.filters) {
            let enc = JSON.stringify(cmd.settings.filters);

            // special case - if it contains a "+" character, this won't survive
            // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
            // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
            if (enc.indexOf('+') > -1)
              enc = btoa(enc);
            cmd.params.filters = enc;
          }
        },
      });
  }
}

const cmd = new ContentItems();
