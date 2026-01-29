"use client";

import { useState } from "react";
import { useTripContext } from "@/context/TripProvider";
import { DateRange } from "react-day-picker";
import { createTripAction } from "@/app/actions/trip-actions";
import type { TripPlan } from "@/utils/schemas";
// ...existing code...

type CreateTripParams = {
    date: DateRange;
    destination: string;
};

export const useTripPlanner = () => {
    const { setTripPlan } = useTripContext();

    async function createTrip({ date, destination }: CreateTripParams): Promise<void> {
        const startDate = date?.from ? date.from.toISOString().slice(0, 10) : "";
        const endDate = date?.to ? date.to.toISOString().slice(0, 10) : startDate;

        // reflect loading state in provider
        setTripPlan({ status: "loading", plan: null });

        try {
            const result = await createTripAction({ destination, startDate, endDate });
            // set provider with TripPlanState shape
            setTripPlan({ status: "available", plan: result });
        } catch (err) {
            console.error("createTripAction failed:", err);
            setTripPlan({ status: "error", plan: null });
        } 
    }

    return { createTrip };
}