﻿import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { prepareToAddContent, updateTemplateFromDia } from './contentBlock.templates';
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
export var _contentBlock = {

  // constants
  cViewWithoutContent: '_LayoutElement', // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
  cUseExistingTemplate: -1,
  prepareToAddContent: prepareToAddContent,
  updateTemplateFromDia: updateTemplateFromDia
};
