"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgeStore";
import { Skeleton } from "./ui/skeleton";

type Props = {
  url?: string;
  preview?: boolean;
};

export const Cover = ({ preview, url }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const handleRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} fill alt="Cover Image" className="object-cover" />
      )}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center justify-center gap-x-2">
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={() => coverImage.onReplace(url)}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change cover
          </Button>
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={handleRemove}
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
