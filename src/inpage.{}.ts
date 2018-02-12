import { _manage } from './manage/manage';
import { $quickE } from './quick-edit/quick-e';
import { start } from './quick-edit/start';
import { _toolbarManager } from './toolbar/toolbar-manager';
import { $2sxc } from './x-bootstrap/module-bootstrapper';

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
$2sxc._toolbarManager = _toolbarManager;
$2sxc._manage = _manage;
// $2sxc.contentItems
// window.i18next
// window.i18nextXHRBackend
window.$2sxc = $2sxc;
window.$quickE = $quickE;
$(start); // run on-load
