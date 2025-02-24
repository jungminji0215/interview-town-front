import { Tag } from "./tag";

export interface Question {
  id: number;
  title: string;
  tag: Tag;
}
