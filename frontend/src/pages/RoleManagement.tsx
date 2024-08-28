import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import axios from "axios";
import { toast } from "react-toastify";
import { RoleProp } from "../types";
import ModulePermissions from "../components/ModulePermissions";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

const RoleManagement = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState<RoleProp[]>([]);
  const [roleName, setRoleName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchRoles = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/role`);
      if (response.status === 200) {
        setRoles(response.data);
      } else {
        throw new Error("Failed to Fetch Roles");
      }
    } catch (error: any) {
      if (error.message && error.message === "Network Error") {
        toast.error("Error connecting to the server");
      }
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddRole = async () => {
    if (!roleName) {
      toast.error("Role name is required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/role/new-role`,
        {
          name: roleName,
        }
      );

      if (response.status === 201) {
        toast.success("Role added successfully");
        // setRoles((prevRoles) => [...prevRoles, response.data]);
        fetchRoles();
        setIsDialogOpen(false);
        setRoleName("");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Manage Roles</h3>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>Add Role</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <Input
              placeholder="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddRole}>Add Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isFetching && <p>Loading Roles...</p>}

      <Accordion type="single" collapsible className="max-w-96 mt-4">
        {roles.map((role) => (
          <AccordionItem value={role._id} key={role._id}>
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
