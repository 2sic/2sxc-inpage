



export function isSxcInstance(thing: any): boolean {
  return (thing as SxcInstanceWithInternals).showDetailedHttpError !== undefined;
}
