"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
module_bootstrapper_1.$2sxc.c = module_bootstrapper_1.$2sxc.consts = {
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
var sel = module_bootstrapper_1.$2sxc.c.sel = {};
Object.keys(module_bootstrapper_1.$2sxc.c.cls).forEach(function (key, index) {
    sel[key] = "." + module_bootstrapper_1.$2sxc.c.cls[key];
});
/*
ToDo: functional programming
twoSxc.c.sel = Object.entries(twoSxc.c.cls).reduce((res, current) => {
    res[entry[0]] = entry[1];
    return t;
}, {});
*/
//# sourceMappingURL=2sxc.consts.js.map
//# sourceMappingURL=2sxc.consts.js.map