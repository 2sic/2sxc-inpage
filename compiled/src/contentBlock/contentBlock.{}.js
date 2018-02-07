"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contentBlock_templates_1 = require("./contentBlock.templates");
/*
 * this is a content block in the browser
 *
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 *
 * Maybe ToDo 2cb:
 * 2sxc should have one entry point (interface to browser context) only.
 * Otherwise, we cannot know, when which part will be executed and debugging becomes very difficult.
 *
 */
var ContentBlockMain = /** @class */ (function () {
    function ContentBlockMain() {
        // constants
        this.cViewWithoutContent = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
        this.cUseExistingTemplate = -1;
        this.prepareToAddContent = contentBlock_templates_1.prepareToAddContent;
        this.updateTemplateFromDia = contentBlock_templates_1.updateTemplateFromDia;
    }
    return ContentBlockMain;
}());
exports.ContentBlockMain = ContentBlockMain;
/**
 * The main content-block manager
 */
// ReSharper disable once InconsistentNaming
exports._contentBlock = new ContentBlockMain();
//# sourceMappingURL=contentBlock.{}.js.map