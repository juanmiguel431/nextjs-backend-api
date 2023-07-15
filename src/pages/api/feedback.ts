// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs/promises';
import path from 'path';
import { Feedback, GetResponse, PostResponse } from '@/models';

const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

const extractFeedback = async (filePath: string) => {
  const fileData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileData) as Feedback[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  if (req.method === 'GET') {
    const filePath = buildFeedbackPath();
    const feedbacks = await extractFeedback(filePath);
    res.status(200).json({
      message: 'Success',
      data: feedbacks
    });

  } else if (req.method === 'POST') {
    const body = req.body as Feedback;

    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email: body.email,
      feedback: body.feedback
    };

    const filePath = buildFeedbackPath();
    const data = await extractFeedback(filePath);
    data.push(newFeedback);

    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Success',
      data: newFeedback
    });
  } else {
    res.status(400);
  }
}
