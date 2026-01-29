import { z } from 'zod';

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const LocationSchema = z.object({
    name: z.string().min(1),
    description: z.string().max(1000),
    coords: z.array(z.number()),
    priority: z.number(),
    type: z.enum(['attraction', 'restaurant', 'hotel', 'other']),
    durationMinutes: z.number().int().min(0).max(24 * 60),
}).describe('Location entry');

export const DaySchema = z.object({
    dayNumber: z.number(),
    date: z.string().regex(dateRegex, 'Invalid date (expected YYYY-MM-DD)'),
    summary: z.string().max(1000),
    locations: z.array(LocationSchema).min(0).max(50),
}).describe('Single day in trip plan');

export const TripSchema = z.array(DaySchema).describe('Array of trip days');

export type TripPlan = z.infer<typeof TripSchema>;


