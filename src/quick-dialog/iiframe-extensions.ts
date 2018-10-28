//
// Note: NOT shared between this project and angular, because these properties are not needed there
//

import { IIFrameBridge } from '../interfaces/iiframe-bridge';

export interface IIFrameExtensions extends IIFrameBridge {
  sxcCacheKey: string;
  dialogName: string;
  toggle(action: boolean): void;
  // stuff we need here, not in the angular project
  closeCallback(): void,
  rewire(sxc: SxcInstanceWithInternals, callback: any, dialogName: string): void,

}
