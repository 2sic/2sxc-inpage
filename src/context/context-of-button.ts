import { ButtonConfig } from '../toolbar2/button/button-config';
import { ContextOfToolbar } from './context-of-toolbar';

export class ContextOfButton extends ContextOfToolbar {
  button: ButtonConfig;
  element: HTMLElement;
  // cmdSpec: CmdSpec;
  // enableTools: boolean;
  // isContent: boolean;
}
