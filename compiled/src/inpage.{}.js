"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("./commands/commands");
var context_1 = require("./context/context");
var manage_1 = require("./manage/manage");
var quick_e_1 = require("./quick-edit/quick-e");
var start_1 = require("./quick-edit/start");
var _2sxc__translateInit_1 = require("./translate/2sxc._translateInit");
require("./x-bootstrap/module-bootstrapper");
$2sxc.context = context_1.context; // primary API to get the context
$2sxc._translateInit = _2sxc__translateInit_1._translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
// const $2sxc = window.$2sxc as SxcControllerWithInternals;
// import '/2sxc-api/js/2sxc.api';
// TODO inpage globals
// export let $2sxc = window.$2sxc as SxcControllerWithInternals;
// let $2sxc: SxcControllerWithInternals = window.$2sxc = {} as SxcControllerWithInternals;
// $2sxc.c = $2sxc.consts
// $2sxc.system
$2sxc._commands = commands_1.Commands.getInstance();
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
// $2sxc._toolbarManager = _toolbarManager;
$2sxc._manage = manage_1._manage;
// $2sxc.contentItems
// window.i18next
// window.i18nextXHRBackend
// window.$2sxc = $2sxc;
window.$quickE = quick_e_1.$quickE;
$(start_1.start); // run on-load
//# sourceMappingURL=inpage.{}.js.map