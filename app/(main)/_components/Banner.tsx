"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

type Props = {
  documentId: Id<"documents">;
};

export const Banner = ({ documentId }: Props) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const handleRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted successfully",
      error: "Failed to delete note",
    });
    router.push("/documents/");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored successfully",
      error: "Failed to restore note",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Trash</p>
      <Button
        size={"sm"}
        onClick={handleRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={handleRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
