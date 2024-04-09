'use client';

import { useEffect, useState } from 'react';

export default function Comment(props) {
  let [comment, setComment] = useState('');
  let [commentList, setCommentList] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list/${props._id}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCommentList(response);
      });
  }, []);

  return (
    <div>
      {commentList.length > 0
        ? commentList.map((item, index) => (
            <div key={index}>
              <p>{item.content}</p>
            </div>
          ))
        : '댓글 없음'}
      <div></div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch('/api/comment/new', {
            method: 'POST',
            body: JSON.stringify({
              comment: comment,
              _id: props._id,
            }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
