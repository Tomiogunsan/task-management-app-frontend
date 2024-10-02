import Pagination from "shared/Pagination";

import { twMerge } from "tailwind-merge";

import Dropdown from "shared/Dropdown";
import DropdownItems from "shared/Dropdown/DropdownItems";
import { createRef } from "react";

import { IAlignType, ITableBody, ITableHead, ITableProp } from "./interface";

const Table = <TData extends ITableBody>({
  tableHeads,
  dataTableSource,
  showMenu,
  showPagination,
  showDivider,
  total,
  menuOptions,
  onMenuClick,
  loading,
  tableEmptyState,
  tableLoader,
  className,
  onRowClick,
  handleMenu,
  pageSize,
  currentPage,
  onPageChange,
  
}: ITableProp<TData>) => {
  const dataLength = total as number;
  const TableBodyRef = createRef<HTMLTableSectionElement>();
  const itemsPerPage = pageSize as number; // Number of items to display per page

  // Calculate the indexes for the current page
  const startIndex = ((currentPage as number) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number, pageSize: number) => {
    if (onPageChange) {
      onPageChange(page, pageSize);
    }
  };

  const borderValue = showDivider ? "1px" : "0px";

  const dataTableSourceLength = dataTableSource?.length as number;

  const stickyCSS = ({ sticky, stickyTo }: ITableHead<TData>) => `
  ${
    sticky
      ? `sticky top-0  z-[1] bg-[#FFFFFF] 
      ${
        stickyTo === "right"
          ? "shadow-[inset_rgb(7,8,10,0.4)_8px_0px_14px_-15px] left-auto right-0 "
          : "shadow-[inset_rgb(7,8,10,0.4)_-8px_0px_14px_-15px] left-0"
      }`
      : ""
  }
  `;

  const tableRowClassName = `w-full bg-white cursor-pointer text-[14px] text-[#334155] font-[400] border-gray-300`;
  const tableCellClassName = "px-[20px] py-[8px]";

  return (
    <div className={twMerge("flex flex-col overflow-hidden w-full", className)}>
      <div
        id="tableContainer"
        className={`w-full h-auto border-[1px] rounded-xl border-gray-300 overflow-y-auto flex flex-col`}
      >
        {loading ? (
          tableLoader
        ) : !loading && dataTableSourceLength > 0 ? (
          <table>
            <thead className="w-full sticky top-0 z-[2]" autoCapitalize="false">
              {tableHeads?.map((head, i) => {
                const { label, align } = head;
                return (
                  <th
                    key={i}
                    className={twMerge(
                      tableCellClassName,
                      `py-[10px] font-[500] bg-white text-sm text-[#64748B] whitespace-nowrap
                        after:block after:content-[''] after:border-t-[${borderValue}] after:w-full after:absolute after:top-full after:left-0 after:h-[1px] after:bg-gray-300
                        ${stickyCSS(head)}
                      }`
                    )}
                    align={(align || "left") as IAlignType}
                  >
                    {label}
                  </th>
                );
              })}

              {showMenu && (
                <th
                  className={twMerge(
                    tableCellClassName,
                    `text-left py-[10px] font-[400] bg-white  whitespace-nowrap`
                  )}
                  align="center"
                >
                  <span className="sr-only"></span>
                </th>
              )}
            </thead>

            <tbody ref={TableBodyRef} className={showDivider ? "divide-y" : ""}>
              {dataTableSource.map((rowData, indexKey) => {
                return (
                  <tr
                    key={indexKey}
                    className={tableRowClassName}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      onRowClick && onRowClick(rowData);
                    }}
                  >
                    {tableHeads?.map((head, i) => {
                      const { accessor, align, render } = head;
                      const dataToShow =
                        (render
                          ? render(rowData)
                          : rowData[accessor as string]) || "--";
                      return (
                        <td
                          key={i}
                          className={twMerge(
                            tableCellClassName,
                            `whitespace-nowrap text-gray-600 ${
                              !onRowClick ? "cursor-default" : ""
                            }
                            ${stickyCSS(head)}
                            `
                          )}
                          align={(align || "left") as IAlignType}
                        >
                          {dataToShow}
                        </td>
                      );
                    })}

                    {showMenu && (
                      <td
                        className={twMerge(tableCellClassName, "relative")}
                        align="right"
                      >
                        {(() => {
                          const itemOptions = (menuOptions || []).filter(
                            (menuItem) => {
                              return !(
                                menuItem?.hide &&
                                menuItem?.hide(dataTableSource[indexKey])
                              );
                            }
                          );

                          if (itemOptions.length === 0) {
                            return null;
                          }
                          return (
                            <span
                              className="flex justify-center bg-red-90p  -ml-5"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Dropdown
                                trigger={
                                  <div className="w-max rounded-full font-bold cursor-pointer p-2 icon-dots-vertical text-base hover:bg-gray-50"></div>
                                }
                                onOpen={() => {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                  handleMenu && handleMenu(rowData);
                                }}
                              >
                                <DropdownItems
                                  items={itemOptions.map((menuItem) => ({
                                    label: menuItem?.menuTitle,
                                    className: menuItem?.className,
                                    onClick: () => {
                                      if (onMenuClick) {
                                        onMenuClick(rowData);
                                      }
                                      menuItem?.action(rowData);
                                    },
                                  }))}
                                />
                              </Dropdown>
                            </span>
                          );
                        })()}
                      </td>
                    )}
                  </tr>
                );
              })}
              {/* <tr className={tableRowClassName}>
                <td
                  colSpan={dataTableSource.length}
                  className="p-[-10px_0px_10px]"
                >
                  {EoLProps?.show && (
                    <EoL
                      showLoader={EoLProps?.showLoader}
                      onVisible={EoLProps?.onVisible}
                      config={{
                        threshold: 0.1,
                        root: TableBodyRef.current,
                      }}
                    />
                  )}
                </td>
              </tr> */}
            </tbody>
          </table>
        ) : (
          tableEmptyState
        )}
      </div>
      {/* pagination */}
      {loading && showPagination
        ? null
        : dataTableSourceLength === 0
        ? null
        : showPagination &&
          dataLength > 0 && (
            <div
              className="flex items-center justify-end mt-[8px]"
              id="tablePagination"
            >
              <Pagination
                pageSize={itemsPerPage}
                endIndex={endIndex}
                startIndex={startIndex}
                currentPage={currentPage as number}
                onChangeOfPage={handlePageChange}
                lengthOfData={dataLength}
              />
            </div>
          )}
    </div>
  );
};

Table.defaultProps = {
  showDivider: true,
};
export default Table;
