import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  if (request.method === 'DELETE') {
    let session = await getServerSession(request, response, authOptions);
    const db = (await connectDB).db('next');
    let findData = await db
      .collection('post')
      .findOne({ _id: new ObjectId(JSON.parse(request.body)._id) });

    if (findData.author === session.user.email) {
      let result = await db.collection('post').deleteOne({
        _id: new ObjectId(JSON.parse(request.body)._id),
      });
      return response.status(200).json('삭제 완료');
    } else {
      return response.status(400).json('사용자가 일치하지 않습니다.');
    }
  }
}
