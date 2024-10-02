import { useState } from 'react';

export type IPagenationSetter = {
  total: number;
  page_size: number;
  current_page: number;
  total_pages: number;
};
const PagenationSetter = () => {
  const [valuer, setValuer] = useState<IPagenationSetter>({
    total: 0,
    page_size: 0,
    current_page: 1,
    total_pages: 0,
  });

  return { valuer, setValuer };
};

export default PagenationSetter;
