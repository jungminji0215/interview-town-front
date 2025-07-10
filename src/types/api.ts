/*
 * 파일: /src/types/api.ts
 * 역할: API 응답과 관련된 공통 타입을 정의합니다.
 * 변경 이유:
 * - 기존의 인덱스 시그니처 방식은 'pagination' 속성과 타입 충돌을 일으킵니다 (TS2411).
 * - 이 문제를 해결하기 위해, 실제 데이터 부분과 pagination 부분을 분리한 후
 * 교차 타입(&)으로 결합하는 방식으로 수정합니다.
 * - Record<string, T>를 사용하여 "어떤 이름의 키든 올 수 있지만, 그 값은 타입 T여야 한다"는
 * 데이터 부분을 명확히 정의하고, 여기에 pagination 정보를 추가합니다.
 */

/**
 * 페이지네이션 정보의 구조를 정의하는 타입
 */
export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

/**
 * 페이지네이션이 적용된 API 응답의 공통 구조를 정의하는 제네릭(Generic) 타입
 * T는 실제 데이터 배열의 타입을 나타냅니다. (예: Answer[], Question[])
 */
export type PaginatedResponse<T> = {
  // ★★★ 핵심 변경 ★★★
  // Record<string, T>는 'answers' 또는 'questions'와 같이 동적으로 변하는
  // 데이터 키를 안전하게 타이핑하고, 여기에 고정된 pagination 정보를 결합합니다.
  data: Record<string, T> & {
    pagination: PaginationInfo;
  };
};
