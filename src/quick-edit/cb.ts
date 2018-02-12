import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

/**
 * extend the quick edit with the core commands
 */

export class Cb implements Delete {
  delete(clip: any): any {
    const sxc: SxcInstanceWithInternals = twoSxc(clip.list) as SxcInstanceWithInternals;
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent, field, index, appOrContent, list, newGuid): any {
    const sxc: SxcInstanceWithInternals = twoSxc(list) as SxcInstanceWithInternals;
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}
