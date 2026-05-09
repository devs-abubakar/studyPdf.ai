
export default function Input({ className, ...props }) {
  return (
    <input
      className="w-full h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-zinc-100 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-600"
      {...props}
    />
  );
}