import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AzureOpenAI } from 'openai';

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  deployment: 'gpt-4.1-mini',
  apiVersion: '2025-04-14',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages,
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('Azure OpenAI error:', err);
    return res.status(500).json({ error: 'Failed to get response' });
  }
}
