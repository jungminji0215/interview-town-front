import { Question } from '@/types/question';

export interface QuestionsResponse {
  questions: Question[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
