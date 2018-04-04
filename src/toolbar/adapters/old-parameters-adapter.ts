// polyfills
import '../../polyfills/Object.assign'; // fix for IE11 Object.assign

export function oldParametersAdapter(action: any): any {

  let params: any = {};

  if (action) {

    if (action.name) {
      params.action = action.name;
    }

    if (action.params) {
      Object.assign(
        params,
        action.params);
    }
  }

  return params;
}