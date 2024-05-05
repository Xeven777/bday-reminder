import { cn } from "@/lib/utils";

const Bloby = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "duration-500 transition-all min-w-24 rounded-full bg-purple-900 blur-3xl absolute",
        className
      )}
    />
  );
};

export default Bloby;
