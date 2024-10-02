export type IPagination = {
  pageSize: number;
  startIndex: number;
  endIndex: number;
  lengthOfData: number;
  currentPage: number;
  onChangeOfPage: (_page: number, _pageSize: number) => void;
};
