'use server';

import { generateText, Output, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { TripPlan, DaySchema } from '@/utils/schemas';
import { getLocationInformation, getTripPlanPrompted } from '@/utils/prompteds';

type CreateTripParams = {
    destination: string;
    startDate: string;
    endDate: string;
};


type LocationInfo = {
    name: string
}

const response: TripPlan = [
    {
        "dayNumber": 1,
        "date": "2026-01-01",
        "summary": "Midtown icons, skyline views, and classic NYC bites.",
        "locations": [
            {
                "name": "Russ & Daughters at The Jewish Museum",
                "description": "morning 08:30 — bagel with lox and coffee to start the day.",
                "coords": [-73.9579, 40.7842],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 45
            },
            {
                "name": "Central Park (The Mall & Bethesda Terrace)",
                "description": "Stroll the park’s most iconic promenade and terrace for photos and a relaxed walk.",
                "coords": [-73.9712, 40.7756],
                "priority": 2,
                "type": "attraction",
                "durationMinutes": 75
            },
            {
                "name": "The Museum of Modern Art (MoMA)",
                "description": "Focus on highlights like Van Gogh, Warhol, and the sculpture garden.",
                "coords": [-73.9776, 40.7614],
                "priority": 1,
                "type": "attraction",
                "durationMinutes": 150
            },
            {
                "name": "The Modern",
                "description": "lunch 13:00 — refined seasonal plates with a calm dining room near MoMA.",
                "coords": [-73.9772, 40.7617],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 75
            },
            {
                "name": "Top of the Rock Observation Deck",
                "description": "Golden-hour skyline viewing with great angles on Central Park and Midtown.",
                "coords": [-73.9787, 40.7594],
                "priority": 2,
                "type": "attraction",
                "durationMinutes": 90
            },
            {
                "name": "Keen's Steakhouse",
                "description": "dinner 19:30 — classic NYC institution; order a signature chop or shareable sides.",
                "coords": [-73.9872, 40.7507],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 105
            }
        ]
    },
    {
        "dayNumber": 2,
        "date": "2026-01-03",
        "summary": "Downtown landmarks, neighborhoods, and waterfront energy.",
        "locations": [
            {
                "name": "Leo's Bagels",
                "description": "morning 08:30 — quick bagel sandwich and coffee near the Financial District.",
                "coords": [-74.0132, 40.7083],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 40
            },
            {
                "name": "9/11 Memorial & Museum",
                "description": "Reflect at the memorial pools and explore the museum’s core exhibits.",
                "coords": [-74.0134, 40.7115],
                "priority": 1,
                "type": "attraction",
                "durationMinutes": 150
            },
            {
                "name": "Brooklyn Bridge Walk (Manhattan to Brooklyn)",
                "description": "Walk the span for skyline views, then continue into DUMBO for photos.",
                "coords": [-73.9969, 40.7061],
                "priority": 2,
                "type": "attraction",
                "durationMinutes": 75
            },
            {
                "name": "Time Out Market New York",
                "description": "lunch 13:00 — pick from multiple NYC favorites with easy seating and views.",
                "coords": [-73.9896, 40.7033],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 70
            },
            {
                "name": "The High Line (Gansevoort to 14th St)",
                "description": "Elevated park walk with art installations and Hudson River vistas.",
                "coords": [-74.0064, 40.7390],
                "priority": 2,
                "type": "attraction",
                "durationMinutes": 75
            },
            {
                "name": "L'Artusi",
                "description": "dinner 19:30 — West Village Italian; go for handmade pasta and a simple dessert.",
                "coords": [-74.0057, 40.7329],
                "priority": 3,
                "type": "restaurant",
                "durationMinutes": 100
            }
        ]
    }
];

export async function createTripAction(params: CreateTripParams): Promise<TripPlan> {
    const prompt = getTripPlanPrompted(params);

    // const { output } = await generateText({
    //     model: openai('gpt-5-mini'),
    //     prompt,
    //     output: Output.array({ element: DaySchema })
    // });

    // small delay for downstream UX / debugging
    // await new Promise((res) => setTimeout(res, 3000));
    return response
}

export async function locationInfo(params: LocationInfo): Promise<Response> {
    const prompt = getLocationInformation(params.name);

    const result = streamText({
        model: openai('gpt-5-mini'),
        prompt,
    });

    return result.toUIMessageStreamResponse();
}


