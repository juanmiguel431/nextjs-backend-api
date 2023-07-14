// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs/promises';
import path from 'path';

interface Feedback {
  id: string;
  email: string;
  feedback: string;
}

interface Response {
  message: string;
  data: Feedback;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== 'POST') {
    res.status(400);
    return;
  }

  const body = req.body as Feedback;

  const newFeedback: Feedback = {
    id: new Date().toISOString(),
    email: body.email,
    feedback: body.feedback
  };

  const filePath = path.join(process.cwd(), 'data', 'feedback.json');

  const fileData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileData) as Feedback[];
  data.push(newFeedback);

  await fs.writeFile(filePath, JSON.stringify(data));

  res.status(201).json({
    message: 'Success',
    data: newFeedback
  });
}
