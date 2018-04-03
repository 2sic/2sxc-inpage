export function getSxcInstance(module: any): SxcInstanceWithInternals {
  const sxc = $2sxc(module) as SxcInstanceWithInternals;
  sxc.cms = $2sxc.cms;
  return sxc;
}
