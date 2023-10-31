"use client";
import Link from "next/link";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end items-center justify-between w-full flex gap-x-2">
        {isLoading && <Spinner />}

        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Sign in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Jotion Free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
