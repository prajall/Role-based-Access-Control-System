export interface PermissionProp {
  module: string;
  actions: string[];
}

export interface RoleProp {
  _id: string;
  name: string;
  permissions: PermissionProp[];
}
