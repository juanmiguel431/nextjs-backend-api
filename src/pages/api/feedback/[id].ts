import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '@/pages/api/feedback/index';
import { Feedback, GetResponse } from '@/models';

export default async function handler (req: NextApiRequest, res: NextApiResponse<GetResponse<Feedback | undefined>>) {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    const filePath = buildFeedbackPath();
    const feedbacks = await extractFeedback(filePath);
    const item = feedbacks.find(i => i.id === id);

    res.status(200).json({ message: 'Success', data: item });
  } else {
    res.status(400);
  }
}
