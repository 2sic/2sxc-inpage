import { UserOfEditContext } from './user-of-edit-context';

export class NgDialogParams {
  zoneId: number;
  appId: number;
  tid: number;
  mid: number;
  cbid: number;
  lang: string;
  langpri: string;
  langs: any; //string[] | null;
  portalroot: string;
  websiteroot: string;
  partOfPage: boolean;
  versioningRequirements: string;
  publishing: string;
  user: UserOfEditContext;
  approot: string | null;
}