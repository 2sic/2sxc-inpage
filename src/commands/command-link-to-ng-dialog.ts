import { DataEditContext } from '../data-edit-context/data-edit-context';
import { commandCreate } from './command-create';
import { Settings } from './settings';

/**
 * create a dialog link
 * @param sxc
 * @param specialSettings
 */
export function commandLinkToNgDialog(sxc: SxcInstanceWithInternals, editContext: DataEditContext, specialSettings: Settings): string {
  const cmd = commandCreate(sxc, editContext, specialSettings);

  if (cmd.settings.useModuleList) cmd.addContentGroupItemSetsToEditList(true);
  else cmd.addSimpleItem();

  // if the command has own configuration stuff, do that now
  if (cmd.settings.configureCommand) cmd.settings.configureCommand(cmd);

  return cmd.generateLink();
}
