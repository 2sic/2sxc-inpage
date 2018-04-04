import { DataEditContext } from '../data-edit-context/data-edit-context';
import { ContextOfButton } from '../context/context-of-button';

export class UserOfEditContext {
  canDesign: boolean;
  canDevelop: boolean;

  // todo: stv, constructor should be removed after refactoring
  //constructor(editContext?: DataEditContext) {
  //  if (editContext) {
  //    this.canDesign = editContext.User.CanDesign;
  //    this.canDevelop = editContext.User.CanDesign;
  //  }
  //}

  static fromContext(context: ContextOfButton): UserOfEditContext {
    const user = new UserOfEditContext();
    user.canDesign = context.user.canDesign;
    user.canDevelop = context.user.canDevelop;
    return user;
  }
}
