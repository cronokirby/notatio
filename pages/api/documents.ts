import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../src/db';

async function createDocument(): Promise<ObjectID> {
  const db = await connectDB(process.env.DB_URL);
  const res = await db.collection('document').insertOne({ tags: [] });
  return res.insertedId;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json([]);
  } else if (req.method === 'POST') {
    const id = await createDocument();
    res.status(200).json({ id });
  }
};
