'use client';

import Spinner from '@/components/ui/Spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { z } from 'zod';
import { authSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';

// import 만 다르고 사용 방법은 똑같다. 다만 서버에서 돌아가냐 클라이언트에서 돌아가냐 차이
import { signIn } from 'next-auth/react'; // 클라이언트에서는 이거
// import { signIn } from '@auth'; // 서버 환경에서는 이거

type FormFields = z.infer<typeof authSchema>;

export default function SignInForm() {
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
      const result = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
        // redirect : true로 하면 서버쪽에서 리다이랙트함 (그래서 서버 리다이랙트 끔)
        // 하지만 redirect: false 이면 로그인 실패해도 오류가 발생해도 status 가 200임
        // 그래서 실패할 경우 코드를 변경하는 방식으로 하기 auth.ts 에서
      });

      if (result.code === 'invalid_credentials') {
        setError('root', {
          type: 'server',
          message: '이메일 또는 비밀번호를 확인해주세요.',
        });
      } else {
        router.replace(ROUTES.QUESTIONS);
      }
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다.'); // 서버 꺼져도 여기로 안오네
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
