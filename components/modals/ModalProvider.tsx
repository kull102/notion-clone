"use client";

import { useState, useEffect } from "react";
import { SettingModal } from "./SettingModal";
import CoverImageModal from "./CoverImageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  );
};
