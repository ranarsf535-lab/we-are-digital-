function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/10 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <Skeleton className="h-72 w-full rounded-none" />
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center gap-3 mt-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 space-y-3 text-center">
      <Skeleton className="h-12 w-24 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  );
}

export default Skeleton;
