import { streamText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { locationSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const context = await req.json();
    console.log(context)
    const result = streamText({
        model: openai('chatgpt-4o-latest'),
        output: Output.object({ schema: locationSchema }),
        prompt:
            `Give me more info about ${context}}`,
    });

    return result.toTextStreamResponse();
}