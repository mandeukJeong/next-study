import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);

  if (request.method === 'POST') {
    request.body = JSON.parse(request.body);
    let comment = {
      content: request.body.comment,
      parent: new ObjectId(request.body._id),
      author: session.user.email,
    };

    const db = (await connectDB).db('next');
    let result = await db.collection('comment').insertOne(comment);
    return response.status(200).json('저장완료');
  }
}
