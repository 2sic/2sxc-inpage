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
/**
 * The main content-block manager
 */
exports._contentBlock = {
    // constants
    cViewWithoutContent: '_LayoutElement',
    cUseExistingTemplate: -1,
    prepareToAddContent: contentBlock_templates_1.prepareToAddContent,
    updateTemplateFromDia: contentBlock_templates_1.updateTemplateFromDia
};
//# sourceMappingURL=contentBlock.{}.js.map