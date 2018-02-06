import { DataEditContext } from '../data-edit-context/data-edit-context';
import { Settings } from './settings';
import { create } from './create';
/**
 * create a dialog link
 * @param sxc
 * @param specialSettings
 */
export function linkToNgDialog(sxc: SxcInstanceWithInternals, editContext: DataEditContext, specialSettings: Settings) : string {
  const cmd = create(sxc, editContext, specialSettings);

  if (cmd.settings.useModuleList) cmd.addContentGroupItemSetsToEditList(true);
  else cmd.addSimpleItem();

  // if the command has own configuration stuff, do that now
  if (cmd.settings.configureCommand) cmd.settings.configureCommand(cmd);

  return cmd.generateLink();
}
