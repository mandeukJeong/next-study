import { connectDB } from '@/util/database';

export default async function Home() {
  const db = (await connectDB).db('next');
  let result = await db.collection('post').find().toArray();

  return <div>안녕</div>;
}
