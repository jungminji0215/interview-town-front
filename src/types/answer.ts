export type Answer = {
  id: number;
  questionId: number;
  userId: number;
  content: string;
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
