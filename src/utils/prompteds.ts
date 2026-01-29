export function getTripPlanPrompted(params: { destination: string; startDate: string; endDate: string }): string {
    const { destination, startDate, endDate } = params;
    return `
Return ONLY a top-level JSON array of day objects (no prose, no markdown, no explanation). The array must represent a day-by-day trip plan for ${destination} covering ${startDate} to ${endDate}.

Each day object MUST match exactly this shape and types:
{
    "dayNumber": number,
    "date": "YYYY-MM-DD",
    "summary": string,            // short one-line summary
    "locations": [ ...Location objects... ]
}

Each Location object MUST match exactly this shape:
{
    "name": string,
    "description": string,           // 1-2 sentences; for meals include time and one-line suggestion
    "coords": [longitude, latitude], // numbers
    "priority": number,              // integer (1 = highest)
    "type": "attraction"|"restaurant"|"hotel"|"other",
    "durationMinutes": integer       // minutes spent at the location
}

Hard rules (model must follow):
- The top-level value must be a JSON array of day objects only.
- Dates must be valid ISO dates (YYYY-MM-DD) and within the requested date range when possible.
- Each day MUST include exactly 3 locations with "type": "restaurant" corresponding to morning, lunch, and dinner (include meal label and time in the description).
- Each day MUST include 2 to 3 locations with "type": "attraction" (museums, notable streets, parks, viewpoints, etc.).
- Therefore each day's 'locations'array length MUST be 5 or 6 (3 restaurants + 2-3 attractions).
- 'coords'must be an array of two numbers [longitude, latitude] in the same city/area.
- 'priority'must be an integer; 'durationMinutes'must be an integer between 0 and 1440.
- Keep 'description'concise (1-2 sentences). Do not add extra keys to day or location objects.
- If you cannot produce a valid plan, return an array with a single day where 'dayNumber'is 0 and include an 'error' key explaining why.

Provide a single short example day (matching the schema) as guidance below. DO NOT output this example in addition to the final array during inference — the example is for instruction only; the model's final reply must still be ONLY the JSON array of days.

Example day item (use this structure as exact guide):
{
    "dayNumber": 1,
    "date": "2026-06-01",
    "summary": "Historic center walking and museums",
    "locations": [
        {
            "name": "National History Museum",
            "description": "Main exhibits; spend the morning here.",
            "coords": [-0.1276, 51.5074],
            "priority": 1,
            "type": "attraction",
            "durationMinutes": 120
        },
        {
            "name": "High Street Walk",
            "description": "Scenic walking street with shops and architecture.",
            "coords": [-0.1250, 51.5060],
            "priority": 2,
            "type": "attraction",
            "durationMinutes": 60
        },
        {
            "name": "Corner Cafe",
            "description": "morning 08:30 — casual coffee and pastries.",
            "coords": [-0.1265, 51.5068],
            "priority": 3,
            "type": "restaurant",
            "durationMinutes": 45
        },
        {
            "name": "Market Bistro",
            "description": "lunch 13:00 — local specialties at the market stalls.",
            "coords": [-0.1248, 51.5070],
            "priority": 3,
            "type": "restaurant",
            "durationMinutes": 60
        },
        {
            "name": "Riverside Grill",
            "description": "dinner 19:30 — riverside dining with regional dishes.",
            "coords": [-0.1280, 51.5055],
            "priority": 2,
            "type": "restaurant",
            "durationMinutes": 90
        }
    ]
}

Remember: final output must be ONLY a JSON array of day objects (no surrounding text).`;
}

export function getLocationInformation(name: string) {
    return `return me an information about this location: ${name}`
}