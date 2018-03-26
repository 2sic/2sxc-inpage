import { ContextOfButton } from '../../context/context-of-button';
import { Settings } from '../../commands/settings';

export function settingsAdapter(oldSettings: any): any {

  const newSettings: any = {};

  // 'classes',
  if (oldSettings.classes) {
    newSettings.classes = oldSettings.classes;
  }

  // 'disabled'
  if (oldSettings.disabled) {
    newSettings.disabled = ((context: ContextOfButton, settings: Settings) => oldSettings.disabled);
  }

  // 'dynamicClasses',
  if (oldSettings.dynamicClasses) {
    newSettings.dynamicClasses = oldSettings.dynamicClasses;
  }

  // 'icon',
  if (oldSettings.icon) {
    newSettings.icon = ((context: ContextOfButton) => oldSettings.icon);
  }

  // partOfPage
  if (oldSettings.partOfPage) {
    newSettings.partOfPage = ((context: ContextOfButton) => oldSettings.partOfPage);
  }

  // 'showCondition',
  if (oldSettings.showCondition) {
    newSettings.showCondition = oldSettings.showCondition;
  }

  // 'title',
  if (oldSettings.title) {
    newSettings.title = ((context: ContextOfButton) => oldSettings.title);
  }

  return newSettings;
}
