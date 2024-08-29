//@ts-nocheck
"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext<any>({});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appData, setAppData] = useState({ user: null });
  const [isLoadingAppData, setIsLoadingAppData] = useState(true);
  const fetchUser = async () => {
    setIsLoadingAppData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/loggedin-user`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setAppData((prev) => ({ ...prev, user: response.data }));
      }
    } catch (error: any) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      console.log(error);
    } finally {
      setIsLoadingAppData(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Appdata updated:", appData);
  }, [appData]);

  return (
    <AppContext.Provider value={{ appData, setAppData, isLoadingAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
