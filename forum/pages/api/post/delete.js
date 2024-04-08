import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'DELETE') {
    const db = (await connectDB).db('next');
    let result = await db.collection('post').deleteOne({
      _id: new ObjectId(JSON.parse(request.body)._id),
    });
    return response.status(200).json('삭제 완료');
  }
}
