import { connectDB } from '@/util/database';
import Link from 'next/link';

export default async function List() {
  const db = (await connectDB).db('next');
  let result = await db.collection('post').find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, index) => (
        <div className="list-item" key={index}>
          <Link href={`/detail/${item._id}`}>{item.title}</Link>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
