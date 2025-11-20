"use client";

import { useEffect, useState } from "react";
import type { Venue } from "@/lib/types";
import { SeatingMap } from "@/components/seating-map";
import { SeatDetails } from "@/components/seat-details";
import { SelectionSummary } from "@/components/selection-summary";
import { Controls } from "@/components/controls";
import { Legend } from "@/components/legend";
import { Toaster } from "@/components/ui/toaster";
import { useSeatSelection } from "@/hooks/use-seat-selection";
import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heatMapEnabled, setHeatMapEnabled] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  // Load venue data
  useEffect(() => {
    fetch("/venue.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load venue data");
        return res.json();
      })
      .then((data: Venue) => {
        setVenue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[v0] Error loading venue:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const {
    selectedSeatIds,
    selectedSeats,
    focusedSeatId,
    focusedSeat,
    maxSeats,
    toggleSeat,
    selectSeats,
    clearSelection,
    setFocusedSeatId,
  } = useSeatSelection(venue?.sections || []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
            role="status"
            aria-label="Loading"
          />
          <p className="mt-4 text-muted-foreground">Loading venue...</p>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive" role="alert">
            Error: {error || "Venue data not available"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card shrink-0">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">
                  {venue.name}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Interactive Seating Map
                </p>
              </div>
              <Controls
                heatMapEnabled={heatMapEnabled}
                isDark={isDark}
                onToggleHeatMap={() => setHeatMapEnabled(!heatMapEnabled)}
                onToggleTheme={toggleTheme}
                onFindAdjacent={(seats) => selectSeats(seats.map((s) => s.id))}
                sections={venue.sections}
              />
            </div>
            <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
              <Legend heatMapEnabled={heatMapEnabled} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Seating Map */}
          <div className="flex-1 overflow-auto min-h-[300px] lg:min-h-0">
            <div className="h-full bg-muted/20 p-2 sm:p-4">
              <SeatingMap
                venue={venue}
                selectedSeats={selectedSeatIds}
                focusedSeatId={focusedSeatId}
                heatMapEnabled={heatMapEnabled}
                onSeatClick={toggleSeat}
                onSeatFocus={setFocusedSeatId}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 border-t lg:border-t-0 lg:border-l border-border bg-card/50 overflow-y-auto lg:overflow-visible min-h-0 max-h-[50vh] lg:max-h-none">
            <SeatDetails seat={focusedSeat} />
            <SelectionSummary
              selectedSeats={selectedSeats}
              maxSeats={maxSeats}
              onClearSelection={clearSelection}
            />
          </aside>
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
