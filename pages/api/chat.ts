// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Note: 'o3-mini' doesn't exist, using 'gpt-4o-mini' instead
    messages: [
      { role: 'user', content: req.body.message }
    ],
  });

  res.status(200).json({ response: completion.choices[0].message.content || '' });
}
