"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var old_parameters_adapter_1 = require("../adapters/old-parameters-adapter");
var render_helpers_1 = require("./render-helpers");
/**
 * generate the html for a button
 * @param sxc instance sxc
 * @param buttonConfig
 * @param groupIndex group-index in which the button is shown
 */
function renderButton(context, groupIndex) {
    var buttonConfig = context.button;
    // if the button belongs to a content-item, move the specs up to the item into the settings-object
    flattenActionDefinition(buttonConfig);
    // retrieve configuration for this button
    var oldParamsAdapter = old_parameters_adapter_1.oldParametersAdapter(buttonConfig.action);
    var onclick = '';
    if (!buttonConfig.disabled) {
        onclick = "$2sxc(" + context.instance.id + ", " + context.contentBlock.id + ").manage.run(" + JSON.stringify(oldParamsAdapter) + ", event);";
        // onclick = `$2sxc(${context.instance.id}, ${context.contentBlock.id}).manage.run2($2sxc.context(this), ${JSON.stringify(oldParamsAdapter)}, event);`;
    }
    var button = document.createElement('a');
    if (buttonConfig.action) {
        button.classList.add("sc-" + buttonConfig.action.name);
    }
    button.classList.add("group-" + groupIndex);
    if (buttonConfig.disabled) {
        button.classList.add('disabled');
    }
    render_helpers_1.addClasses(button, buttonConfig.classes, ',');
    if (buttonConfig.dynamicClasses) {
        var dynamicClasses = buttonConfig.dynamicClasses(context);
        render_helpers_1.addClasses(button, dynamicClasses, ' ');
    }
    button.setAttribute('onclick', onclick); // serialize JavaScript because of ajax
    if (buttonConfig.title) {
        button.setAttribute('data-i18n', "[title]" + buttonConfig.title(context)); // localization support
    }
    var box = document.createElement('div');
    var symbol = document.createElement('i');
    if (buttonConfig.icon) {
        render_helpers_1.addClasses(symbol, buttonConfig.icon(context), ' ');
    }
    symbol.setAttribute('aria-hidden', 'true');
    box.appendChild(symbol);
    button.appendChild(box);
    return button;
}
exports.renderButton = renderButton;
/**
 * does some clean-up work on a button-definition object
 * because the target item could be specified directly, or in a complex internal object called entity
 * @param actDef
 */
function flattenActionDefinition(actDef) {
    if (!actDef.entity || !actDef.entity._2sxcEditInformation) {
        return;
    }
    var editInfo = actDef.entity._2sxcEditInformation;
    actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
    if (editInfo.entityId !== undefined) {
        actDef.entityId = editInfo.entityId;
    }
    if (editInfo.sortOrder !== undefined) {
        actDef.sortOrder = editInfo.sortOrder;
    }
    delete actDef.entity; // clean up edit-info
}
//# sourceMappingURL=render-button.js.map