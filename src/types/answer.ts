import { ApiResponse } from "./common";
export type Answer = {
  id: number;
  content: string;
};

export type RealtimeAnswer = {
  id: number;
  question_id: number;
  user_id: number;
  content: string;
};

export type AnswersResponse = ApiResponse<{ answers: RealtimeAnswer[] }>;
