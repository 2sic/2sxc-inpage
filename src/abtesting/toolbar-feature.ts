import * as A_BuildToolbars from '../toolbar/build-toolbars';
import * as A_GenerateButtonHtml from '../toolbar/generate-button-html';
import * as A_GenerateToolbarHtml from '../toolbar/generate-toolbar-html';
import * as A_ToolbarManager from '../toolbar/toolbar-manager';

import * as B_BuildToolbars from '../toolbar2/build-toolbars';
import * as B_GenerateButtonHtml from '../toolbar2/generate-button-html';
import * as B_GenerateToolbarHtml from '../toolbar2/item/render-toolbar';
import * as B_ToolbarManager from '../toolbar2/toolbar-manager';

import { isA } from './ab-testing-config';


export let _toolbarManager = (isA) ? A_ToolbarManager._toolbarManager : B_ToolbarManager._toolbarManager;
export let disable = (isA) ? A_BuildToolbars.disable : B_BuildToolbars.disable;
export let isDisabled = (isA) ? A_BuildToolbars.isDisabled : B_BuildToolbars.isDisabled;
export let buildToolbars = (isA) ? A_BuildToolbars.buildToolbars : B_BuildToolbars.buildToolbars;
export let generateButtonHtml = (isA) ? A_GenerateButtonHtml.generateButtonHtml : B_GenerateButtonHtml.generateButtonHtml;
export let generateToolbarHtml = (isA) ? A_GenerateToolbarHtml.generateToolbarHtml : B_GenerateToolbarHtml.renderToolbar;
