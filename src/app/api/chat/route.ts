import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { DaySchema } from '@/utils/schemas';

export async function POST(req: Request) {
  const { message } = await req.json();
  
  try {
    const { output } = await generateText({
      model: openai('gpt-5'),
      prompt: message,
      output: Output.array({ element: DaySchema }),
    });
    console.log(JSON.stringify(output))
    return output
  }
  catch (e) {
    console.log(e)
  }
}