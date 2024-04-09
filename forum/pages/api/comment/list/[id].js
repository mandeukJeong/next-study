import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const db = (await connectDB).db('next');
    let result = await db
      .collection('comment')
      .find({
        parent: new ObjectId(request.query.id),
      })
      .toArray();
    return response.status(200).json(result);
  }
}
