import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { UserProp } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ManageUsers = () => {
  const [users, setUsers] = useState<UserProp[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProp | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("role");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const roles = ["User", "Employee", "Admin"];

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        params: {
          page: 1,
          limit: 10,
          sortField,
          sortOrder,
        },
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error: any) {
      if (error.response?.data?.message)
        toast.error(error.response?.data?.message);
      else {
        toast.error("Failed to fetch users.");
      }
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleConfirmRoleChange = async () => {
    if (selectedUser && selectedRole) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/user/role/${selectedUser._id}`,
          {
            newRole: selectedRole,
          }
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id
              ? { ...user, role: selectedRole }
              : user
          )
        );
        toast.success("Role updated successfully!");
      } catch (error: any) {
        if (error.response?.data?.message)
          toast.error(error.response?.data?.message);
        else {
          toast.error("Failed to update role.");
        }
        console.error("Failed to update role:", error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const openRoleChangeDialog = (user: UserProp, role: string) => {
    setSelectedUser(user);
    setSelectedRole(role);
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [sortField]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="mb-4 items-center flex gap-2">
        <p className="text-xs">Sort By</p>
        <Select onValueChange={(value) => handleSortChange(value)}>
          <SelectTrigger className="max-w-44">
            {sortField == "email" ? "Email" : "Role"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="role">Role</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(value) => openRoleChangeDialog(user, value)}
                >
                  <SelectTrigger className="w-full border-teal-600 max-w-96 text-teal-600">
                    {user.role}
                    {/* <SelectValue placeholder="Select role" /> */}
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button className="bg-teal-600 text-white">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle>Confirm Role Change</DialogTitle>
          <DialogDescription>
            Are you sure you want to change the user's role to{" "}
            <strong>{selectedRole}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRoleChange}
              variant="default"
              className="bg-teal-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
