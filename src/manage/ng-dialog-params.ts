import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getUserOfEditContext } from './api';
import { UserOfEditContext } from './user-of-edit-context';

export class NgDialogParams {
  zoneId: number;
  appId: number;
  tid: number;
  mid: number;
  cbid: number;
  lang: string;
  langpri: string;
  langs: any; // string[] | null;
  portalroot: string;
  websiteroot: string;
  partOfPage: boolean;
  versioningRequirements: string;
  publishing: string;
  user: UserOfEditContext;
  approot: string | null;

  constructor(sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
    this.zoneId = editContext.ContentGroup.ZoneId;
    this.appId = editContext.ContentGroup.AppId;
    this.tid = editContext.Environment.PageId;
    this.mid = editContext.Environment.InstanceId;
    this.cbid = sxc.cbid;
    this.lang = editContext.Language.Current;
    this.langpri = editContext.Language.Primary;
    this.langs = JSON.stringify(editContext.Language.All);
    this.portalroot = editContext.Environment.WebsiteUrl;
    this.websiteroot = editContext.Environment.SxcRootUrl;
    this.partOfPage = editContext.ContentBlock.PartOfPage;
    // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
    this.publishing = editContext.ContentBlock.VersioningRequirements;
    // todo= probably move the user into the dashboard info
    this.user = getUserOfEditContext(editContext);
    this.approot = editContext.ContentGroup.AppUrl || null; // this is the only value which doesn't have a slash by default.  note that the app-root doesn't exist when opening "manage-app"
  }
}
