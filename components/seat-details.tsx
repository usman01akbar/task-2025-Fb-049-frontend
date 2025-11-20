'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeatWithSection } from '@/lib/types';
import { getSeatPrice } from '@/lib/seat-utils';

interface SeatDetailsProps {
  seat: SeatWithSection | null;
}

export function SeatDetails({ seat }: SeatDetailsProps) {
  if (!seat) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Seat Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Click or focus on a seat to view details</p>
        </CardContent>
      </Card>
    );
  }
  
  const price = getSeatPrice(seat.priceTier);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Seat Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Section</p>
          <p className="text-lg font-semibold">{seat.sectionLabel}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Row</p>
          <p className="text-lg font-semibold">{seat.rowIndex}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Seat</p>
          <p className="text-lg font-semibold">{seat.col}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Price</p>
          <p className="text-lg font-semibold">${price}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <p className="text-lg font-semibold capitalize">{seat.status}</p>
        </div>
      </CardContent>
    </Card>
  );
}
