import { generateText, Output, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { DaySchema } from '@/utils/schemas';
import { z } from 'zod';

export async function POST(req: Request) {
    const { text: prompt } = await req.json();

    const result = streamObject({
        model: openai('gpt-4o'),
        output: 'no-schema',
        prompt: 'Hello'
    });

    return result.toTextStreamResponse();
}