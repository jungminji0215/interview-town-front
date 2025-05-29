import { z } from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '유효한 이메일 주소를 입력해주세요' })
    .trim(),
  password: z.string().min(6, { message: '비밀번호는 6글자 이상 입력해주세요.' }).trim(), // TODO 숫자 상수로 빼기
});
