import { RoleProp } from "@/types";

const ModulePermissions = ({ role }: { role: RoleProp }) => {
  const modules = ["Customer", "Employee", "Product", "Orders", "Billing"];
  const actions = ["view", "add", "update", "delete"];
  return (
    <div>
      {modules.map((module, index) => {
        const modulePermission = role.permissions.find(
          (permission) => permission.module === module
        );
        return (
          <tr key={index}>
            <td>{module}</td>
            {actions.map((action) => {
              const isChecked = modulePermission
                ? modulePermission.actions.includes(action)
                : false;

              return (
                <td key={action}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    // onChange={() =>
                    //   handlePermissionChange(role, module, action)
                    // }
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </div>
  );
};

export default ModulePermissions;
