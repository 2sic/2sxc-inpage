//
// Note: NOT shared between this project and angular, because that object is a bit different
//

import { IIFrameExtensions } from './iiframe-extensions';

/**
 * copy interface from C:\Projects\2sxc-ui\angular\quick-dialog\src\app\core\dialog-frame-element.ts
 */

export interface IDialogFrameElement extends HTMLIFrameElement/*, IIFrameBridge*/ {
  bridge: IIFrameExtensions
}
