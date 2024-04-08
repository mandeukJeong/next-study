'use client';
import { signIn, signOut } from 'next-auth/react';

export default function LoginBtn(props) {
  return (
    <>
      {props.session ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      )}
    </>
  );
}
