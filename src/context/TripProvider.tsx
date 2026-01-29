"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { TripPlan } from '@/utils/schemas';

type TripPlanState = {
  status: 'available' | 'loading' | 'error';
  plan: TripPlan | null;
};

type TripContextType = {
  tripPlan: TripPlanState | null;
  setTripPlan: (p: TripPlanState | null) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripPlan, setTripPlan] = useState<TripPlanState | null>(null);

  return (
    <TripContext.Provider value={{ tripPlan, setTripPlan }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext(): TripContextType {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTripContext must be used within TripProvider');
  return ctx;
}