﻿/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
export function translate(key) {
  // return key;
  return ($.t && $.t(key)) || key;
};

$2sxc.translate = translate;