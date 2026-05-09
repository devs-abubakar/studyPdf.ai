
export function Button({ variant = "primary", className, ...props }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"

  const variants = {
    primary:
      "bg-primary text-white hover:opacity-90",
    secondary:
      "bg-muted text-foreground hover:bg-border",
    outline:
      "border border-border text-foreground hover:bg-muted",
    ghost:
      "text-foreground hover:bg-muted"
  }

  return (
    <button
      className={(base, variants[variant], className)}
      {...props}
    />
  )
}