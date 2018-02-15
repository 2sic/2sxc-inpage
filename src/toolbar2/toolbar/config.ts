import { ToolbarParameters } from './parameters';
import { ToolbarSettings } from './settings';

/** contains a toolbar config + settings + many groups */
export class ToolbarConfig {
  items;
  settings: ToolbarSettings; // like floating of toolbar, etc.
  params: ToolbarParameters; // like EntityId, Content - Type - Name
}