import { connectDB } from '@/util/database';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('next');
  let result = await db.collection('post').find().toArray();
  console.log(result);

  return <div>안녕</div>;
}
