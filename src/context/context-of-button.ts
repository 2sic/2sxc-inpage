import { CmdSpec } from '../commands/cmd-spec';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { ButtonConfig } from '../toolbar2/button/button-config';

export class ContextOfButton {
  button: ButtonConfig;
  sxc: SxcInstanceWithInternals;
  editContext: DataEditContext;
  cmdSpec: CmdSpec;
  enableTools: boolean;
  isContent: boolean;
}
