import { _commands } from './commands/commands';
import { context } from './context/context';
import { _manage } from './manage/manage';
import { $quickE } from './quick-edit/quick-e';
import { start } from './quick-edit/start';
import { _translateInit } from './translate/2sxc._translateInit';
import './x-bootstrap/module-bootstrapper';

$2sxc.context = context; // primary API to get the context
$2sxc._translateInit = _translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
// debugger;
// const $2sxc = window.$2sxc as SxcControllerWithInternals;
// import '/2sxc-api/js/2sxc.api';
// TODO inpage globals
// export let $2sxc = window.$2sxc as SxcControllerWithInternals;
// let $2sxc: SxcControllerWithInternals = window.$2sxc = {} as SxcControllerWithInternals;
// $2sxc.c = $2sxc.consts
// $2sxc.system
$2sxc._commands = _commands;
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
$2sxc._manage = _manage;
// $2sxc.contentItems
// window.i18next
// window.i18nextXHRBackend
// window.$2sxc = $2sxc;
window.$quickE = $quickE;
$(start); // run on-load
