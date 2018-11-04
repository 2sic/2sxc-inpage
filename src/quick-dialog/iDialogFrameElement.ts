//
// Note: NOT shared between this project and angular, because that object is a bit different
//

import Iframe = require('./iframe');
import DialogIFrame = Iframe.IFrameBridge;

export interface IDialogFrameElement extends HTMLIFrameElement {
  bridge: DialogIFrame
}
