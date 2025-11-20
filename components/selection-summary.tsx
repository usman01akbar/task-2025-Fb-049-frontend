'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SeatWithSection } from '@/lib/types';
import { getSeatPrice } from '@/lib/seat-utils';

interface SelectionSummaryProps {
  selectedSeats: SeatWithSection[];
  maxSeats: number;
  onClearSelection: () => void;
}

export function SelectionSummary({
  selectedSeats,
  maxSeats,
  onClearSelection,
}: SelectionSummaryProps) {
  const subtotal = selectedSeats.reduce(
    (sum, seat) => sum + getSeatPrice(seat.priceTier),
    0
  );
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Selection</span>
          <span className="text-sm font-normal text-muted-foreground">
            {selectedSeats.length} / {maxSeats}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedSeats.length === 0 ? (
          <p className="text-muted-foreground">No seats selected</p>
        ) : (
          <>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">
                      {seat.sectionLabel} - Row {seat.rowIndex}, Seat {seat.col}
                    </p>
                  </div>
                  <p className="font-semibold">${getSeatPrice(seat.priceTier)}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold">Subtotal</p>
                <p className="text-2xl font-bold">${subtotal}</p>
              </div>
              
              <Button
                onClick={onClearSelection}
                variant="outline"
                className="w-full"
                aria-label="Clear all selected seats"
              >
                Clear Selection
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
