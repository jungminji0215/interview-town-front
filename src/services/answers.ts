export const addAnswer = async (questionId: number, content: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // TODO login 기능 생기기 전까지 userId 는 모두 1 으로 저장
    body: JSON.stringify({ userId: 1, content }),
  });
};
