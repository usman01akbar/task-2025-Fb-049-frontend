"use client";

import { useEffect, useState } from "react";
import { Venue } from "@/lib/types";
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
        console.error("Error loading venue:", err);
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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {venue.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive Seating Map
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Legend heatMapEnabled={heatMapEnabled} />
              <Controls
                heatMapEnabled={heatMapEnabled}
                isDark={isDark}
                onToggleHeatMap={() => setHeatMapEnabled(!heatMapEnabled)}
                onToggleTheme={toggleTheme}
                onFindAdjacent={(seats) => selectSeats(seats.map((s) => s.id))}
                sections={venue.sections}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Seating Map */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="h-full min-h-[400px] bg-muted/20 rounded-lg border border-border p-4">
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
          <aside className="w-full lg:w-80 flex flex-col gap-4 p-4 border-t lg:border-t-0 lg:border-l border-border">
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
