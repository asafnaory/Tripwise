"use client";

import type { JSX } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { TripPlan } from "@/utils/schemas";
import { size } from "zod";

type Props = {
    days: TripPlan;
    selectedIndex: number;
    onSelect: (index: number) => void;
    className?: string;
};

export function ToggleGroupSpacing({ days, selectedIndex, onSelect, className }: Props): JSX.Element {
    return (
        <ToggleGroup
            type="single"
            size="lg"
            value={ String(selectedIndex) }
            onValueChange={ (v) => {
                if (v == null) return;
                onSelect(Number(v));
            } }
            aria-label="Select day"
            className={ className }
            variant="outline"
            spacing={ 2 }
        >
            { days.map((d, i) => (
                <ToggleGroupItem key={ i } value={ String(i) } aria-label={ `Day ${i + 1} ${d.date}` } size='lg'>
                    Day { i + 1 }
                </ToggleGroupItem>
            )) }
        </ToggleGroup>
    );
}