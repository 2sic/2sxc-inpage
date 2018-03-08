if (window.$2sxc && !window.$2sxc.consts) {
  $2sxc.c = $2sxc.consts = {
    // classes
    cls: {
      scMenu: 'sc-menu',
      scCb: 'sc-content-block',
      scElm: 'sc-element',
    },
    // attributes
    attr: {
      toolbar: 'toolbar',
      toolbarData: 'data-toolbar',
      settings: 'settings',
      settingsData: 'data-settings',
    },
    publishAllowed: 'DraftOptional',
  };
  // selectors
  const sel: any = $2sxc.c.sel = {};
// ReSharper disable once UnusedParameter
  Object.keys($2sxc.c.cls).forEach((key, index) => {
    sel[key] = `.${$2sxc.c.cls[key]}`;
  });

  /*
  ToDo: functional programming
  $2sxc.c.sel = Object.entries($2sxc.c.cls).reduce((res, current) => {
      res[entry[0]] = entry[1];
      return t;
  }, {});
  */
}
