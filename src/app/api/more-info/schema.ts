import { z } from 'zod';

// define a schema for the notifications
export const locationSchema = z.object({
    haeder: z.string().describe('haeder of the location.'),
    info: z.string().describe('info about the location'),
});