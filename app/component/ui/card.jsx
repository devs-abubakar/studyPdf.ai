import { cn } from "@/lib/utils/cn";

export default function Card({ children, className }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm p-6"
    >
      {children}
    </div>
  );
}