import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

// prevent propagation of the click (if menu was clicked)
$(twoSxc.c.sel.scMenu /*".sc-menu"*/).click(e => e.stopPropagation());
