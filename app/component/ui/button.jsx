import {cn} from '@/app/lib/utils/utils'

export default function Button({ children,  type = "button", variant = "primary", className, ...props }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"

  const variants = {
  primary:
  "bg-pink-500 text-white hover:bg-pink-600",
    secondary:
      "bg-muted text-foreground hover:bg-border",
    outline:
      "border border-border text-foreground hover:bg-muted",
    ghost:
      "text-foreground hover:bg-muted"
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    > {children}
    </button>


  )
}