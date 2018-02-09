import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * used to build instance config
 */
export class InstanceConfig {
  portalId: number;
  tabId: number;
  moduleId: number;
  version: string;
  contentGroupId: string;
  cbIsEntity: boolean;
  cbId: number;
  appPath: string;
  isList: boolean;

  constructor(editContext: DataEditContext) {
    const ce = editContext.Environment;
    const cg = editContext.ContentGroup;
    const cb = editContext.ContentBlock;

    this.portalId = ce.WebsiteId;
    this.tabId = ce.PageId;
    this.moduleId = ce.InstanceId;
    this.version = ce.SxcVersion;
    this.contentGroupId = cg.Guid;
    this.cbIsEntity = cb.IsEntity;
    this.cbId = cb.Id;
    this.appPath = cg.AppUrl;
    this.isList = cg.IsList;
  }
}
