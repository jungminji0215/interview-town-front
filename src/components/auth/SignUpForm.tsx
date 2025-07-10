'use client';

import { signUp } from '@/lib/auth-actions';
import Spinner from '@/components/ui/Spinner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/schemas/auth';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

type FormFields = z.infer<typeof authSchema>;

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, undefined);

  const {
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
  });

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input
        {...register('email')}
        placeholder="이메일을 입력해주세요."
        type="email"
        className="rounded-md border-2 p-4"
      />
      {errors?.email && <p className="px-2 text-sm text-red-500">{errors.email.message}</p>}
      <input
        {...register('password')}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        className="rounded-md border-2 p-4"
      />
      {errors?.password && <p className="px-2 text-sm text-red-500">{errors.password.message}</p>}
      <SubmitButton />
      {(state?.error || state?.fieldErrors) && (
        <div className="mt-2 px-2 text-center text-sm text-red-500">
          {state?.error && <p>{state.error}</p>}
          {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
          {state?.fieldErrors?.password && <p>{state.fieldErrors.password}</p>}
        </div>
      )}{' '}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="btn-primary cursor-pointer rounded-md p-4 text-center"
    >
      <p className="flex justify-center">{pending ? <Spinner /> : '회원 가입'}</p>
    </button>
  );
}
