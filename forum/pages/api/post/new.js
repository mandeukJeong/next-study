import { connectDB } from '@/util/database';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    if (request.body.title === '' || request.body.content === '') {
      return response.status(400).json('모든 값을 입력해주세요');
    }

    try {
      const db = (await connectDB).db('next');
      let result = await db.collection('post').insertOne({
        title: request.body.title,
        content: request.body.content,
      });
      return response.status(200).redirect('/list');
    } catch (error) {
      console.log(error);
    }
  }
}
