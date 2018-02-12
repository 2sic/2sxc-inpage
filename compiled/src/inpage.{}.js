"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quick_e_1 = require("./quick-edit/quick-e");
var toolbar_manager_1 = require("./toolbar/toolbar-manager");
var module_bootstrapper_1 = require("./x-bootstrap/module-bootstrapper");
// import '/2sxc-api/js/2sxc.api';
// TODO inpage globals
// export let $2sxc = window.$2sxc as SxcControllerWithInternals;
// let $2sxc: SxcControllerWithInternals = window.$2sxc = {} as SxcControllerWithInternals;
// $2sxc.c = $2sxc.consts
// $2sxc.system
// $2sxc._commands = {};
// $2sxc._lib
// $2sxc._commands.definitions = {};
// $2sxc._contentBlock
// $2sxc.translate
// $2sxc.contentItems
// $2sxc._commands.instanceEngine
// ? $2sxc.urlParams
// $2sxc._quickDialog
// $2sxc.totalPopup
// $2sxc._commands.definitions
debugger;
module_bootstrapper_1.$2sxc._toolbarManager = toolbar_manager_1._toolbarManager;
// $2sxc._manage
// $2sxc.contentItems
// window.i18next
// window.i18nextXHRBackend
window.$2sxc = module_bootstrapper_1.$2sxc;
window.$quickE = quick_e_1.$quickE;
//# sourceMappingURL=inpage.{}.js.map