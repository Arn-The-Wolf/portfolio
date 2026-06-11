export default function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.06)_0%,_transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
    </div>
  )
}
