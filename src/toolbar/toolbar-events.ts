import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';

// prevent propagation of the click (if menu was clicked)
$($2sxc.c.sel.scMenu /*".sc-menu"*/).click((e: any) => e.stopPropagation());
