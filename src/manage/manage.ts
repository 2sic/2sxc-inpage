import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { initInstance } from './create';

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
class Manage {
  initInstance = initInstance;
}

twoSxc._manage = new Manage();
