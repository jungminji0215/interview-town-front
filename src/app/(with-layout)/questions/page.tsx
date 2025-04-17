// import { categoriesAPI } from '@/services/categories';

// 전체 질문 목록
// import { tagsAPI } from '@/services/tags';
// import { questionsAPI } from '@/services/questions';
// import HomeClient from '@/components/HomeClient';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function QuestionPage(props: { searchParams: SearchParams }) {
  // const searchParams = await props.searchParams;
  //
  // const category = Array.isArray(searchParams.category)
  //   ? searchParams.category[0]
  //   : (searchParams.category ?? 'frontend');
  //
  // const tag = Array.isArray(searchParams.tag) ? searchParams.tag[0] : (searchParams.tag ?? 'all');
  //
  // const {
  //   data: { categories },
  // } = await categoriesAPI.getCategories();
  //
  // const {
  //   data: { tags },
  // } = await tagsAPI.getTagsByCategory(category);
  //
  // const {
  //   data: { questions },
  // } = await questionsAPI.getQuestions(category);

  return (
    <section className="mx-auto max-w-5xl px-5 py-5">
      {/*<HomeClient*/}
      {/*  categories={categories}*/}
      {/*  tags={tags}*/}
      {/*  initialQuestions={questions}*/}
      {/*  currentCategory={category}*/}
      {/*  currentTag={tag}*/}
      {/*/>*/}
      질문 목록
    </section>
  );
}
