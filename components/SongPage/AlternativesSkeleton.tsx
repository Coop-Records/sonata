import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function AlternativesSkeleton(
  { count, className }: { count: number, className?: string }
) {
  return (
    <>
      {(new Array(count)).fill(0).map((_, i) => (
        <div key={i} className={cn('w-28', className)}>
          <Skeleton className="size-10 mx-auto rounded-full" />
          <Skeleton className="w-[70%] h-3 mx-auto mt-2 rounded-sm" />
        </div>
      ))}
    </>
  );
}