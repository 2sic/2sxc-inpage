import { ContextOfButton } from '../../context/context-of-button';
import { Settings } from '../../commands/settings';

export function settingsAdapter(oldSettings: any): any {

  const newSettings: any = {};

  // 'classes',
  if (oldSettings.classes) {
    newSettings.classes = oldSettings.classes;
  }

  // 'dialog',
  if (oldSettings.dialog) {
    newSettings.dialog = oldSettings.dialog;
  }
  // 'disabled'
  if (oldSettings.disabled) {
    newSettings.disabled = oldSettings.disabled;
  }

  // 'dynamicClasses',
  if (oldSettings.dynamicClasses) {
    newSettings.dynamicClasses = oldSettings.dynamicClasses;
  }

  // 'icon',
  if (oldSettings.icon) {
    newSettings.icon = oldSettings.icon;
  }

  // partOfPage
  if (oldSettings.partOfPage) {
    newSettings.partOfPage = oldSettings.partOfPage;
  }

  // 'showCondition',
  if (oldSettings.showCondition) {
    newSettings.showCondition = oldSettings.showCondition;
  }

  // 'title',
  if (oldSettings.title) {
    newSettings.title = oldSettings.title;
  }

  return newSettings;
}
