'use client';

import { signin } from '@/api/auth';
import Spinner from '@/components/ui/Spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { z } from 'zod';
import { authSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';

type FormFields = z.infer<typeof authSchema>;

export default function SignInForm() {
  const { setToken, setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await signin(data);

      setToken(response.accessToken);
      setUser(response.email); // TODO 닉네임으로 변경

      router.push(ROUTES.QUESTIONS);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'invalid_credentials':
            setError('root', {
              type: 'server',
              message: '이메일 또는 비밀번호를 확인해주세요.',
            });
            break;
          default:
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            console.error(error);
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        console.error(error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="btn-primary cursor-pointer rounded-md p-4 text-center"
      >
        <p className="flex justify-center">{isSubmitting ? <Spinner /> : '로그인'}</p>
      </button>
      {errors?.root && (
        <p className="px-2 text-center text-sm text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
}
