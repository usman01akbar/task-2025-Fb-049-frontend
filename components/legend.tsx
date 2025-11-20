'use client';

interface LegendProps {
  heatMapEnabled: boolean;
}

export function Legend({ heatMapEnabled }: LegendProps) {
  if (heatMapEnabled) {
    return (
      <div className="flex items-center gap-4 flex-wrap" role="legend" aria-label="Price tier legend">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ef4444]" aria-hidden="true" />
          <span className="text-sm text-foreground">Tier 1 - $150</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#f59e0b]" aria-hidden="true" />
          <span className="text-sm text-foreground">Tier 2 - $100</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#22c55e]" aria-hidden="true" />
          <span className="text-sm text-foreground">Tier 3 - $75</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-4 flex-wrap" role="legend" aria-label="Seat status legend">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#10b981]" aria-hidden="true" />
        <span className="text-sm text-foreground">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#3b82f6]" aria-hidden="true" />
        <span className="text-sm text-foreground">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#f59e0b]" aria-hidden="true" />
        <span className="text-sm text-foreground">Reserved</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#ef4444]" aria-hidden="true" />
        <span className="text-sm text-foreground">Sold</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#8b5cf6]" aria-hidden="true" />
        <span className="text-sm text-foreground">Held</span>
      </div>
    </div>
  );
}
