"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manage_create_1 = require("./manage.create");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
/**
 * A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
module_bootstrapper_1.$2sxc._manage = {
    initInstance: manage_create_1.initInstance
};
//# sourceMappingURL=manage.{}.js.map