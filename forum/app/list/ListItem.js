'use client';
import Link from 'next/link';

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((item, index) => (
        <div className="list-item" key={index}>
          <Link href={`/detail/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
          <Link href={`/edit/${item._id}`}>✏️</Link>
          <span
            onClick={() => {
              fetch('/api/post/delete', {
                method: 'DELETE',
                body: JSON.stringify({
                  _id: item._id,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((response) => {
                  console.log(response);
                });
            }}
          >
            🗑️
          </span>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
