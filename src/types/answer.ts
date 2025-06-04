export type Answer = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  questionId: number;
  userId?: number;
};

export type AnswerResponse = {
  data: {
    answers: Answer[];
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  };
};

export type MyAnswer = {
  questionId: number;
  questionTitle: string;
  categoryId: number;
  categoryName: string;
  answerId: number;
  content: string;
  answeredAt: string;
};

export type AnswerWithUser = {
  id: number;
  content: string;
  createdAt: string;
  questionId: number;
  user: {
    nickname: string;
  };
};
