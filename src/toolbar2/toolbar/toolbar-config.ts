import { ButtonConfig } from '../button/button-config';
import { GroupConfig } from '../button/group-config';
import { ToolbarParameters } from './toolbar-parameters';
import { ToolbarSettings } from './toolbar-settings';

/** contains a toolbar config + settings + many groups */
export class ToolbarConfig {
  groupConfig: GroupConfig = new GroupConfig(new Array<ButtonConfig>()); // stv: this is temp
  groups = []; // todo: stv rename to 'items', the groups of buttons
  settings: ToolbarSettings; // like floating of toolbar, etc.
  params: ToolbarParameters; // like EntityId, Content - Type - Name
  // todo: old props, remove
  name: string = 'toolbar'; // name, no real use
  debug?: boolean = false; // show more debug info
  defaults: {}; // the button defaults like icon, etc.
}
