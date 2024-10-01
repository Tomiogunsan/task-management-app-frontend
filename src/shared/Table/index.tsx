/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';


// type AnyValue = string | number |
export type ITableHead<TData> = {
  label: ReactNode;
  accessor: keyof TData | "" | null;
  // accessor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (data: TData) => React.ReactNode ;
  align?: "left" | "center" | "right";
  headClassName?: string;
  columnClassName?: string;
  headBackgroundClassName?: string;
};

// export type ITableBody = IJSON;
export type ITableBody = {
  [x: string]: any;
};

type ITableProps<TData> = {
  heads: ITableHead<TData>[];
  body: TData[];
  // body: ITableBody[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMenuClick?: (rowData: TData) => void;
  onRowClick?: (_rowData: TData) => void;
  showView?: boolean;
  emptyStateImage?: ReactNode;
};

const Table = <TData extends ITableBody>({
  heads,
  body,
  onRowClick,
  showView,
  emptyStateImage,
}: ITableProps<TData>) => {
  return (
    <>
      {body?.length === 0 ? (
        <>
          <div className="flex justify-between items-center bg-[#F8F8F8] font-medium">
            {heads.map(({ label, accessor }) => {
              return (
                <p
                  className={`shadow-sm bg-[#F8F8F8] p-4 font-medium h-[48px] border-r-[1px] last:border-r-0`}
                  key={accessor as string}
                >
                  {label}
                </p>
              );
            })}
            {showView && (
              <p className="hidden lg:table-cell shadow-sm bg-[#F8F8F8] p-4 font-medium h-[48px]">
                View
              </p>
            )}
          </div>
          <div className="flex items-center justify-center mt-28">
            {emptyStateImage}
          </div>
        </>
      ) : (
        <table className="w-full bg-[#fff]">
          <thead>
            {heads?.map(
              (head,i) => {
                const {label,align, columnClassName, headClassName} = head
                return (
                  <th
                    className={twMerge(
                      "shadow-sm  p-4 bg-[#F2F2F2] font-medium h-[48px] border-r-[1px] border-[#ccc] last:border-r-0",
                      columnClassName,
                      headClassName
                    )}
                    align={align || "center"}
                    key={i}
                  >
                    {label}
                  </th>
                );
              }
            )}
            {showView && (
              <th className="hidden lg:table-cell shadow-sm bg-[#F8F8F8] p-4 font-medium h-[48px]">
                View
              </th>
            )}
          </thead>
          <tbody>
            {body?.map((data, idx) => {
              return (
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                <tr key={idx} className="border-b-[1px] border-[#ccc] cursor-pointer" onClick={() => {onRowClick && onRowClick(data)}}>
                  {heads.map((head, idx) => {
                    const { align, accessor, render,  columnClassName} = head
                    return (
                      <td
                        align={align || "center"}
                        key={idx}
                        className={twMerge("p-4", columnClassName)}
                      >
                        {render ? render(data) : data[accessor as string]}
                      </td>
                    );
                  })}
                  {showView && (
                    <td className="hidden lg:table-cell text-center">View</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

Table.defaultProps = {
  navigateOnRowClick: true,
}

export default Table;
