import {DataEditContext} from '../../data-edit-context/data-edit-context';

/**
 * this will be something about the sxc - object, version, etc.
 */
export class SxcContext {
  version: string;
  sxc: SxcInstanceWithInternals;
  editContext: DataEditContext;
}
