import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);

  if (session) {
    request.body.author = session.user.email;
  }

  if (request.method === 'POST') {
    if (request.body.title === '' || request.body.content === '') {
      return response.status(400).json('모든 값을 입력해주세요');
    }

    try {
      const db = (await connectDB).db('next');
      let result = await db.collection('post').insertOne({
        title: request.body.title,
        content: request.body.content,
        author: request.body.author,
      });
      return response.status(200).redirect('/list');
    } catch (error) {
      console.log(error);
    }
  }
}
