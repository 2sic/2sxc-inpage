import Sessionstoragehelper = require('../manage/session-storage-helper');
import SessionStorageHelper = Sessionstoragehelper.SessionStorageHelper;


const dialogContentBlockId = 'dia-cbid';

/**
 * This object helps persist / load / reset 
 * the info which content-block should be shown in the quick-edit
 * */
export let quickEditState = {
  persist: (id: string) => sessionStorage.setItem(dialogContentBlockId, id),
  remove: () => sessionStorage.removeItem(dialogContentBlockId),
  get: (): number => SessionStorageHelper.getItemValue<number>(dialogContentBlockId)
}


/**
 * Remember dialog state across page-reload
 * @param {Object<any>} context - the sxc which is persisted for
 */
function persist(id: string): void {
  sessionStorage.setItem(dialogContentBlockId, id);
}