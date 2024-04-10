import { connectDB } from '@/util/database';
import { revalidatePath } from 'next/cache';

export default async function Write2() {
  const db = (await connectDB).db('next');
  let result = await db.collection('post_test').find().toArray();
  async function handleSubmit(formData) {
    'use server';
    const db = (await connectDB).db('next');
    await db
      .collection('post_test')
      .insertOne({ title: formData.get('title') });
    console.log(formData.get('title'));
    revalidatePath('/write');
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" />
        <button type="submit">버튼</button>
      </form>
      {result ? result.map((a, i) => <p key={i}>글제목 : {a.title}</p>) : null}
    </div>
  );
}
