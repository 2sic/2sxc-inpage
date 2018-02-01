//import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
export function translate(key) {
  // return key;
  return ($.t && $.t(key)) || key;
};

//twoSxc.translate = translate;
