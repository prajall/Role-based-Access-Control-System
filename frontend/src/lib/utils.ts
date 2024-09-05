import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkPermission = (
  permissionArray: any,
  module: string,
  action: string
) => {
  if (!permissionArray || Array.isArray(permissionArray)) return false;
  return permissionArray.some(
    (p: any) => p.module === module && !p.actions.includes(action)
  );
};
