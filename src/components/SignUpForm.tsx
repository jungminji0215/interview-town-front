'use client';

import { signUp } from '@/api/auth';
import Spinner from '@/components/ui/Spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '유효한 이메일 주소를 입력해주세요' })
    .trim(),
  password: z.string().min(6, { message: '비밀번호는 6글자 이상 입력해주세요.' }).trim(), // TODO 숫자 상수로 빼기
});

type FormFields = z.infer<typeof authSchema>;

export default function SignUpForm() {
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
      await signUp(data);
      // TODO 성공 시 alert
      router.push(ROUTES.SIGN_IN);
    } catch (error) {
      if (error instanceof Error) {
        // TODO 분리
        switch (error.message) {
          case 'user_exist':
            setError('email', { type: 'server', message: '이미 사용 중인 이메일입니다.' });
            break;
          case 'invalid_email':
            setError('email', { type: 'server', message: '올바른 이메일을 입력해주세요.' });
            break;
          case 'password_too_short':
            setError('password', {
              type: 'server',
              message: '비밀번호는 6글자 이상 입력해주세요.',
            });
            break;
          default:
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            console.error(error);
        }
      } else {
        // throw "문자열"이나 throw { code: 123 }처럼 Error 가 아닌 값을 던졌을 때 대비한 안전장치
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

      {/* TODO 버튼 분리 */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="btn-primary cursor-pointer rounded-md p-4 text-center"
      >
        <p className="flex justify-center">{isSubmitting ? <Spinner /> : '회원 가입'}</p>
      </button>
    </form>
  );
}
