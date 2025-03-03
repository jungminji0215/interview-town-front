import { ApiResponse } from "./common";
export type Answer = {
  id: number;
  content: string;
};

export type AnswersResponse = ApiResponse<{ answers: Answer[] }>;
