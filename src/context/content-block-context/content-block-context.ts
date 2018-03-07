/**
 * information related to the current contentBlock, incl
 */
export class ContentBlockContext {
  id: number; // the CB ID
  isEntity: boolean;
  isList: boolean;
  queryId: number;
  templateId: number;
  contentTypeId: string;
  contentGroupId: string;
}
