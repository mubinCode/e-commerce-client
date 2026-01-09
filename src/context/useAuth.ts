"use client";

import { useEffect, useState } from "react";
import { getAuthInfo } from "@/services/auth-services";

export const useAuth = () => {
  const [user, setUser] = useState(getAuthInfo());

  useEffect(() => {
    const handler = () => setUser(getAuthInfo());
    window.addEventListener("auth-change", handler);
    return () => window.removeEventListener("auth-change", handler);
  }, []);

  return user;
};
