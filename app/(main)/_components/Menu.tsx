"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { Id } from "@/convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";

type Props = {
  documentId: Id<"documents">;
};

export const Menu = ({ documentId }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const handleArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Failed to archive note",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem>
          <Trash
            className="w-4 h-4 mr-2"
            role="button"
            onClick={handleArchive}
          />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
