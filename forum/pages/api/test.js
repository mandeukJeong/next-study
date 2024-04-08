import { connectDB } from '@/util/database';

export default async function handler(request, response) {
  const db = (await connectDB).db('next');
  if (request.method == 'POST') {
    db.collection('post').insertOne({
      title: request.body.title,
      content: request.body.content,
    });
    return response.status(200).json('처리완료');
  }

  if (request.method == 'GET') {
    return response.status(200).json('처리완료');
  }
}
