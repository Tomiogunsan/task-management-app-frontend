import { ITask } from "@services/interfaces/response/project";
import { IMembers } from "@services/interfaces/response/team";
import { useGetAllProjectTaskQuery } from "@services/project.service";
import { formatDate } from "@utils/constant";

import Modal from "shared/Modal";
import StatusBadge, { IStatusType } from "shared/StatusBadge";

import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import EmptyBar from "shared/Table/tableEmptyState";
import TableLoading from "shared/tableLoading";

type Props = {
  onClose: () => void;
  memberData: IMembers;
};
const MemberTask = ({ onClose, memberData }: Props) => {
  const { data, isFetching } = useGetAllProjectTaskQuery({
    id: memberData?.projects?._id as string,
    assignedUser: memberData?._id,
  });

  const tableHead: ITableHead<ITask>[] = [
    {
      label: "Description",
      accessor: "description",
    },
    {
      label: "Date Created",
      accessor: "dateCreated",
      render: ({ dateCreated }) => {
        return !dateCreated
          ? "--"
          : formatDate({ date: dateCreated, time: true });
      },
    },
    {
      label: "Status",
      accessor: "status",
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];
  const menu = [
    {
      menuTitle: "Update status",
      action: () => {},
    },
  ];

  return (
    <Modal
      onClose={onClose}
      header="Member Task"
      action={{ show: false }}
      containerClassName="max-w-max w-full"
    >
      <div className="grid gap-y-4 ">
        <Table
          tableHeads={tableHead}
          dataTableSource={data?.data?.tasks || []}
          loading={isFetching}
          showMenu
          menuOptions={menu}
          tableLoader={<TableLoading title=" Loading Member Task" />}
          tableEmptyState={<EmptyBar componentType="task" />}
        />
      </div>
    </Modal>
  );
};

export default MemberTask;
