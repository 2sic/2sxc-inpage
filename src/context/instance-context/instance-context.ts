/**
 * information related to the current DNN module, incl.instanceId,
 */
export class InstanceContext {
  id: number; // instance id (aka moduleId)
  isEditable: boolean;
  allowPublish: boolean;
}
