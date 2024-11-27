"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Skeleton className="flex items-center justify-center m-4 mt-0 min-h-[100vh] text-lg rounded-lg border bg-card text-card-foreground shadow-sm">
      <Loader2 className="animate-spin text-primary" size={48} />
    </Skeleton>
  );
}
