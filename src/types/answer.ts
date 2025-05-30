export type Answer = {
  id: number;
  questionId: number;
  userId: number;
  content: string;
};

// TODO 이름 별론데..
export type AnswerItem = Answer & {
  isMine: boolean;
};

export type AnswerResponse = {
  data: {
    answers: AnswerItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  };
};
