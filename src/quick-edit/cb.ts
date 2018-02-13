import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * extend the quick edit with the core commands
 */

export class Cb implements Delete {
  delete(clip: any): any {
    const sxc: SxcInstanceWithInternals = getSxcInstance(clip.list) as SxcInstanceWithInternals;
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent, field, index, appOrContent, list, newGuid): any {
    const sxc: SxcInstanceWithInternals = getSxcInstance(list) as SxcInstanceWithInternals;
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}
