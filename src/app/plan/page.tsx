"use client";

import React, { useState, JSX } from "react";
import { useTripContext } from "@/context/TripProvider";
import { Map } from "@/components/map-wrapper/map/Map";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { ToggleGroupSpacing } from "@/components/map-wrapper/days-toggle/DaysToggle";

export default function PlanPage(): JSX.Element {
    const { tripPlan } = useTripContext();
    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

    if (!tripPlan || !tripPlan.plan) return <div>Loading plan...</div>;
    if (tripPlan.status === "loading") return <div>Loading plan...</div>;
    if (tripPlan.status === "error") return <div>Failed to load plan</div>;

    const plan = tripPlan.plan;


    return (
        <main className={ styles.root }>
            <div className={ styles.dayList } role="tablist" aria-label="Days">
                <ToggleGroupSpacing
                    days={ plan }
                    selectedIndex={ selectedDayIndex }
                    onSelect={ (idx) => setSelectedDayIndex(idx) }
                    className={ styles.toggleGroup }
                />
            </div>

            <div className={ styles.mapWrapper }>
                <Map plan={ plan } selectedDayIndex={ selectedDayIndex } />
            </div>
        </main>
    );
}