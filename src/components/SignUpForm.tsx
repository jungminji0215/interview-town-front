'use client';

import React, { useActionState } from 'react';
import SubmitButton from './SubmitButton';
import { signUp } from '@/services/auth';
import Spinner from '@/components/ui/Spinner';

// TODO React Hook Form
export default function SignUpForm() {
  const [state, signUpAction, isPending] = useActionState(signUp, undefined);

  return (
    <form className="flex flex-col gap-3" action={signUpAction}>
      <input
        id="email"
        name="email"
        placeholder="이메일을 입력해주세요."
        type="email"
        className="rounded-md border-2 p-3 text-sm"
      />
      {state?.errors?.email && <p className="px-2 text-sm text-red-500">{state.errors.email}</p>}
      <input
        id="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        className="rounded-md border-2 p-3 text-sm"
      />
      {state?.errors?.password && (
        <p className="px-2 text-sm text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton>{isPending ? <Spinner /> : '회원가입'}</SubmitButton>
    </form>
  );
}
