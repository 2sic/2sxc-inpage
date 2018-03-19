import { ContextOfButton } from '../../context/context-of-button';
import { Settings } from '../../commands/settings';

export function settingsAdapter(oldSettings: any): any {

  const newSettings: any = {};

  // 'classes',
  if (oldSettings.classes) {
    newSettings.classes = oldSettings.classes;
  }

  // 'icon',
  if (oldSettings.icon) {
    newSettings.icon = oldSettings.icon;
  }

  // 'title',
  if (oldSettings.title) {
    newSettings.title = ((context: ContextOfButton) => oldSettings.title);
  }

  // 'dynamicClasses',
  if (oldSettings.dynamicClasses) {
    newSettings.dynamicClasses = oldSettings.dynamicClasses;
  }

  // 'showCondition',
  if (oldSettings.showCondition) {
    newSettings.showCondition = oldSettings.showCondition;
  }

  // 'disabled'
  if (oldSettings.disabled) {
    newSettings.disabled = ((context: ContextOfButton, settings: Settings) => oldSettings.disabled);
  }

  return newSettings;
}
