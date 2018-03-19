import { AddButton } from './add-button';
import { AppButton } from './app-button';
import { AppImportButton } from './app-import-button';
import { AppResourcesButton } from './app-resources-button';
import { AppSettingsButton } from './app-settings-button';
import { Button } from './button';
import { ButtonActionEnum } from './button-action-enum';
import { ContentItemsButton } from './contentitems-button';
import { ContentTypeButton } from './contenttype-button';
import { CustomButton } from './custom-button';
import { DeleteButton } from './delete-button';
import { EditButton } from './edit-button';
import { InstanceListButton } from './instance-list-button';
import { ItemHistoryButton } from './item-history-button';
import { LayoutButton } from './layout-button';
import { MetadataButton } from './metadata-button';
import { MoreButton } from './more-button';
import { MoveDownButton } from './movedown-button';
import { MoveUpButton } from './moveup-button';
import { NewButton } from './new-button';
import { PublishButton } from './publish-button';
import { RemoveButton } from './remove-button';
import { ReplaceButton } from './replace-button';
import { TemplateDevelopButton } from './template-develop-button';
import { TemplateQueryButton } from './template-query-button';
import { TemplateSettingsButton } from './template-settings-button';
import { ZoneButton } from './zone-button';

export class ButtonFactory {
// ReSharper disable once CyclomaticComplexity
  static newButton(
    actionName: ButtonActionEnum,
    title?: string,
    icon?: string,
    classes?: string,
    showCondition?: any,
    dynamicClasses?: any
  ): Button {

    switch (actionName) {

      case ButtonActionEnum.Add:
        return new AddButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.App:
        return new AppButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.AppImport:
        return new AppImportButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.AppResources:
        return new AppResourcesButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.AppSettings:
        return new AppSettingsButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.ContentItems:
        return new ContentItemsButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.ContentType:
        return new ContentTypeButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Custom:
        return new CustomButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Delete:
        return new DeleteButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Edit:
        return new EditButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.InstanceList:
        return new InstanceListButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.ItemHistory:
        return new ItemHistoryButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Layout:
        return new LayoutButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Metadata:
        return new MetadataButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.More:
        return new MoreButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.MoveDown:
        return new MoveDownButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.MoveUp:
        return new MoveUpButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.New:
        return new NewButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Publish:
        return new PublishButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Remove:
        return new RemoveButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Replace:
        return new ReplaceButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.TemplateDevelop:
        return new TemplateDevelopButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.TemplateQuery:
        return new TemplateQueryButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.TemplateSettings:
        return new TemplateSettingsButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      case ButtonActionEnum.Zone:
        return new ZoneButton(
          title,
          icon,
          classes,
          showCondition,
          dynamicClasses);

      default:
        return null;
    }
  }
}