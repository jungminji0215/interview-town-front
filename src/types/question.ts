export type Question = {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
    name: string;
  };
};
