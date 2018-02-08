import { DataEditContext } from "../data-edit-context/data-edit-context";

export class UserOfEditContext {
  canDesign: boolean;
  canDevelop: boolean;

  constructor(editContext: DataEditContext) {
    this.canDesign = editContext.User.CanDesign;
    this.canDevelop = editContext.User.CanDesign;
  }
}