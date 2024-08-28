import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import axios from "axios";
import { toast } from "react-toastify";
import { RoleProp } from "@/types";
import ModulePermissions from "../components/ModulePermissions";

const RoleManagement = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState<RoleProp[]>([]);

  const fetchRoles = async () => {
    setIsFetching(true);
    try {
      console.log(`${import.meta.env.VITE_API_URL}/role`);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/role`);
      if (response.status == 200) {
        setRoles(response.data);
        console.log(response);
      } else throw new Error("Failed to Fetch Roles");
    } catch (error: any) {
      console.log(error);
      if (error.message && error.message == "Network Error") {
        toast.error("Error connection to the server");
      }
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handlePermissionChange = (
    role: string,
    module: string,
    action: string
  ) => {};

  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <div>
      <h3>Manage Roles</h3>
      <Accordion type="single" collapsible className="max-w-96 ">
        {roles.map((role) => (
          <AccordionItem value={role._id}>
            <AccordionTrigger className="hover:no-underline bg-zinc-100 rounded-md px-4 ">
              {role.name}
            </AccordionTrigger>
            <AccordionContent className="bg-zinc-50 rounded-md px-4">
              <ModulePermissions role={role} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RoleManagement;
