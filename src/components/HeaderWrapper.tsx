"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return <Header />;
}
