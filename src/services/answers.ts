'use server';

import { revalidatePath } from 'next/cache';

export const addAnswer = async (questionId: number, content: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId, content }),
  });

  revalidatePath(`/questions/${questionId}`);
};
