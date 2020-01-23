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
    res
      .status(200)
      .json([
        {
          _id: 'foo',
          title: 'General Physics, Electromagnetism',
          tags: ['Physics'],
          body: 'Here is some text',
        },
        {
          _id: 'bar',
          title: 'Computer Networks',
          tags: ['CS'],
          body: 'Here is some text',
        },
        {
          _id: '2',
          title: 'TSSO',
          tags: ['CS', 'Politics'],
          body: 'Here is some text',
        },
        {
          _id: '4',
          title: 'The best course ever',
          tags: ['CS', 'Politics'],
          body: 'Here is some text',
        },
        {
          _id: '5',
          title: 'An even better course',
          tags: ['CS', 'Politics'],
          body: 'Here is some text',
        },
      ]);
  } else if (req.method === 'POST') {
    const id = await createDocument();
    res.status(200).json({ id });
  }
};
