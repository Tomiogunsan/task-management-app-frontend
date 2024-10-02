import { useEffect, useRef } from 'react';
import { IPagination } from './pagination.interface';
import Select from 'shared/Select';

const Pagination = ({
  pageSize,
  startIndex,
  endIndex,
  lengthOfData,
  currentPage,
  onChangeOfPage,
}: IPagination) => {
  const InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    InputRef.current!.value = String(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-[14px] text-[#64748B] font-[400] tracking-normal mr-[10px]">
        <span>
          Showing {startIndex + 1 || 0} to{' '}
          {Math.min(endIndex, lengthOfData) || 0} of {lengthOfData || 0} Records
        </span>
      </div>
      <div className="flex mt-[5px] w-max gap-8">
        <div className="flex items-center">
          <Select
            value={pageSize}
            options={[
              {
                label: '10',
                value: 10,
              },
              {
                label: '20',
                value: 20,
              },
              {
                label: '30',
                value: 30,
              },
              {
                label: '50',
                value: 50,
              },
            ]}
            onChange={value => {
              onChangeOfPage(currentPage, value as number);
            }}
          />
          <div className="whitespace-nowrap text-sm ml-2">Rows per page</div>
        </div>
        <div className="flex  w-max rounded-[10px] font-[500] border-[1px] border-[#CBD5E1]">
          <button
            onClick={() => onChangeOfPage(currentPage - 1, pageSize)}
            disabled={currentPage === 1}
            className=" p-[6px_10px]  text-sm text-[#334155] disabled:text-slate-400"
          >
            {'<'} Prev
          </button>
          <input
            ref={InputRef}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const value = Number(e.currentTarget.value);
                const totalPage = Math.ceil(lengthOfData / pageSize);
                if (value < 1) {
                  onChangeOfPage(1, pageSize);
                } else if (value > totalPage) {
                  onChangeOfPage(totalPage, pageSize);
                } else {
                  onChangeOfPage(value, pageSize);
                }
              }
            }}
            max={lengthOfData}
            min={1}
            type="number"
            className="text-sm !p-[4px_5px] border-[1px] border-t-0 border-b-0 !text-center  !border-[#CBD5E1] w-[60px]"
          />
          <button
            onClick={() => onChangeOfPage(currentPage + 1, pageSize)}
            disabled={endIndex >= lengthOfData}
            className="text-sm text-[#334155] p-[6px_10px]  disabled:text-slate-400"
          >
            Next {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
