import {DataEditContext} from '../../data-edit-context/data-edit-context';
import { ParametersEntity } from '../../data-edit-context/parameters-entity';

/**
 * this will be something about the sxc - object, version, etc.
 */
export class SxcContext {
  version: string;
  parameters: ParametersEntity[] | null;
  sxcRootUrl: string;
  // tmp
  // sxc: SxcInstanceWithInternals; // todo: stv remove this
  editContext: DataEditContext; // todo: stv remove this, should be part of context
}
