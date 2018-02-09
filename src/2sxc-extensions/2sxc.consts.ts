import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

twoSxc.c = twoSxc.consts = {
  // classes
  cls: {
    scMenu: 'sc-menu',
    scCb: 'sc-content-block',
    scElm: 'sc-element'
  },
  // attribs
  attr: {
    toolbar: 'toolbar',
    toolbarData: 'data-toolbar',
    settings: 'settings',
    settingsData: 'data-settings',
  },
  publishAllowed: 'DraftOptional',
};
// selectors
let sel = twoSxc.c.sel = {};
Object.keys(twoSxc.c.cls).forEach((key, index) => {
  sel[key] = `.${twoSxc.c.cls[key]}`;
});

/*
ToDo: functional programming
twoSxc.c.sel = Object.entries(twoSxc.c.cls).reduce((res, current) => {
    res[entry[0]] = entry[1];
    return t;
}, {});
*/
//# sourceMappingURL=2sxc.consts.js.map