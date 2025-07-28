import { User } from 'next-auth';

export type Answer = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  questionId: number;
  userId?: number;
  user: User;
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

export type MyAnswerResponse = {
  data: {
    answer: Answer | null;
  };
};

export type AnswerWithUser = Answer & User;
