export const QUERY_KEYS = {
  questions: {
    // 내가 답변한 질문 목록
    answeredByMe: (userId: number) => ['questions', 'answeredByMe', userId],
  },
  answers: {
    // 한 개의 질문에 대한 나의 답변 목록
    me: (questionId: number, userId: number) => ['answers', 'me', questionId, userId],
  },
};
