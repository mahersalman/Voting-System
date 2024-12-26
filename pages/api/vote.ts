import type { NextApiRequest, NextApiResponse } from 'next';
import { insertVoteData } from '@database/dbController';

interface Vote {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  candidates: string[];
  addresses: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);

      const result = await insertVoteData(req.body as Vote);
      // Respond with success
      res.status(201).json({ message: 'Vote created successfully' });
    } catch (error) {
      console.error('Error saving vote:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}