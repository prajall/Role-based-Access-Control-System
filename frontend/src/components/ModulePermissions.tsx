import { RoleProp } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const ModulePermissions = ({ role }: { role: RoleProp }) => {
  const modules = ["Customer", "Employee", "Product", "Orders", "Billing"];
  const actions = ["view", "add", "update", "delete"];

  const [updatedRole, setUpdatedRole] = useState({ ...role });

  const handlePermissionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    module: string,
    action: string
  ) => {
    // Create a copy of updatedRole to maintain immutability
    const newUpdatedRole = { ...updatedRole };

    const modulePermission = newUpdatedRole.permissions.find(
      (permission) => permission.module === module
    );

    if (modulePermission) {
      if (e.target.checked) {
        if (!modulePermission.actions.includes(action)) {
          modulePermission.actions.push(action);
        }
      } else {
        modulePermission.actions = modulePermission.actions.filter(
          (a) => a !== action
        );
      }
    } else if (e.target.checked) {
      newUpdatedRole.permissions.push({
        module,
        actions: [action],
      });
    }

    setUpdatedRole(newUpdatedRole);
  };

  const updateRole = async () => {
    // Save updatedRole in the database
    console.log("Updated role:", updatedRole);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/role/${updatedRole._id}/update`,
        { permissions: updatedRole.permissions },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <div>
      {modules.map((module, index) => {
        const modulePermission = updatedRole.permissions.find(
          (permission) => permission.module === module
        );
        return (
          <div key={index}>
            <table>
              <tbody>
                <tr>
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
                          onChange={(e) =>
                            handlePermissionChange(e, module, action)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <Button onClick={updateRole}>Save</Button>
    </div>
  );
};

export default ModulePermissions;
