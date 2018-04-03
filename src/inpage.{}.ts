import { Commands } from './commands/commands';
import { context } from './context/context';
import { _manage } from './manage/manage';
import { $quickE } from './quick-edit/quick-e';
import { start } from './quick-edit/start';
import { _translateInit } from './translate/2sxc._translateInit';
import './x-bootstrap/module-bootstrapper';
import { Cms } from './cms/Cms';

$2sxc.context = context; // primary API to get the context
$2sxc._translateInit = _translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc._commands = Commands.getInstance();
$2sxc._manage = _manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js

window.$quickE = $quickE;
$(start); // run on-load

($2sxc as any).cms = new Cms();
