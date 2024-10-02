export type IAlignType =
  | "center"
  | "left"
  | "right"
  | "justify"
  | "char"
  | undefined;

  export type ITableBody = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
  };

  export type ITableMenuOption<TData> = {
    menuTitle: string;
    action: (_rowData: TData) => void;
    hide?: (_rowData: TData) => boolean;
    className?: string;
  };

  export type ITableHead<TData> = {
    label: string;
    accessor: keyof TData | "" | number | null;
    align?: string;
    // eslint-disable-next-line no-unused-vars
    render?: (data: TData) => React.ReactNode;
    sticky?: boolean;
    stickyTo?: "left" | "right";
  };

  export type ITableProp<TData> = {
    className?: string;
    tableHeads?: ITableHead<TData>[];
    showMenu?: boolean;
    dataTableSource: TData[];
    showPagination?: boolean;
    showDivider?: boolean;
    onMenuClick?: (_rowData: TData) => void;
    onRowClick?: (_rowData: TData) => void;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (_page: number, _pageSize: number) => void;
    total?: number;
    loading?: boolean | string;
    menuOptions?: ITableMenuOption<TData>[];
    tableLoader?: React.ReactNode;
    tableEmptyState?: React.ReactNode;
    handleMenu?: (_rowData: TData) => void;
    EoL?: {
      show?: boolean;
      // eslint-disable-next-line no-unused-vars
      onVisible: (entry: IntersectionObserverEntry) => void;
      showLoader: boolean;
    };
  };
