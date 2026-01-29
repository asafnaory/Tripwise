import { openai } from '@ai-sdk/openai';
import { streamObject, streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    // output: 'no-schema',
    prompt:
      `Generate 3 notifications (in JSON) for a messages app in this context:` +
      context,
  });

  return result.toTextStreamResponse();
}