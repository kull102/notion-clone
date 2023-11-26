"use client";
import { ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import Navigation from "./_components/Navigation";
import { SearchCommand } from "@/components/SearchCommand";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
