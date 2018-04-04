import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';

export function getSxcInstance(module: any): SxcInstanceWithInternals {
  const sxc = $2sxc(module) as SxcInstanceWithInternals;
  return sxc;
}
