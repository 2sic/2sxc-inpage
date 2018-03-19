import { context } from "../context/context";
import { ButtonDefinition } from '../toolbar/button/button-definition';
import { buttonConfigAdapter } from "../toolbar/adapters/button-config-adapter";
import { renderButton } from "../toolbar/item/render-button";
import { ExpandToolbarConfig } from "../toolbar/toolbar/toolbar-expand-config";

export class edit {
  //* .command(command stuff)
  //* .button(...)
  //* .group(...)
  //* .toolbar({ }), .toolbar(name1, name2, ...)

  //* either this: .registerCommand($2sxc.api.edit.command(...));
  //* or better: .register(command | toolbarTemplate | ...)

  public static button = (tag: string, def: ButtonDefinition, groupIndex: number): void => {

    const myContext = context($(tag));

    const newButtonConfig = buttonConfigAdapter(
      myContext,
      def,
      groupIndex);

    const button = renderButton(
      myContext,
      newButtonConfig,
      groupIndex);

    $(tag).replaceWith(button.outerHTML);
  }

  //public toolbar = (tag: string, tbConfig: any, moreSettings: any): string => {

  //  const myContext = context(tag);

  //   const toolbarConfig = ExpandToolbarConfig(
  //     myContext,
  //     tbConfig,
  //     moreSettings);

  //   myContext.toolbar = toolbarConfig;

  //  return renderToolbar(myContext);
  //  $(tag).replaceWith(button.outerHTML);
  // };

 // /**
 //* Builds the toolbar and returns it as HTML
 //* @param {Object<any>} tbConfig - general toolbar config
 //* @param {Object<any>} moreSettings - additional / override settings
 //* @returns {string} html of the current toolbar
 //*/

}
