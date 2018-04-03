"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("./commands/commands");
var Cms_1 = require("./cms/Cms");
var context_1 = require("./context/context");
var manage_1 = require("./manage/manage");
var quick_e_1 = require("./quick-edit/quick-e");
var start_1 = require("./quick-edit/start");
var _2sxc__translateInit_1 = require("./translate/2sxc._translateInit");
require("./x-bootstrap/module-bootstrapper");
$2sxc.context = context_1.context; // primary API to get the context
$2sxc._translateInit = _2sxc__translateInit_1._translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc._commands = commands_1.Commands.getInstance();
$2sxc._manage = manage_1._manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
window.$quickE = quick_e_1.$quickE;
$(start_1.start); // run on-load
$2sxc.cms = new Cms_1.Cms();
//# sourceMappingURL=inpage.{}.js.map