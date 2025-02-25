import { ApiResponse } from "./common";
export interface Answer {
  id: number;
  text: string;
}

export type AnswersResponse = ApiResponse<{ answers: Answer[] }>;
