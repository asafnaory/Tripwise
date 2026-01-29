import { streamText, Output } from 'ai';
import { notificationSchema } from './schema';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const context = await req.json();
    console.log(context)
    const result = streamText({
        model: openai('chatgpt-4o-latest'),
        output: Output.object({ schema: notificationSchema }),
        prompt:
            `Generate 3 notifications for a messages app in this context:` + context,
    });

    return result.toTextStreamResponse();
}