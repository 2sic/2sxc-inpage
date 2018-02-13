export function getSxcInstance(module: any): SxcInstanceWithInternals {
  let sxc = $2sxc(module) as SxcInstanceWithInternals;
  return sxc;
}