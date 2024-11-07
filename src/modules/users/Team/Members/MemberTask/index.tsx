import { IMemberTask } from "@services/interfaces/response/team";

import { useGetMemberDetailQuery } from "@services/team.service";

import { formatDate } from "@utils/constant";
import { capitalize } from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "shared/PageHeader";

import StatusBadge, { IStatusType } from "shared/StatusBadge";

import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import EmptyBar from "shared/Table/tableEmptyState";
import TableLoading from "shared/tableLoading";
import UpdateMemberTask from "./components/UpdateMemberTask";

const MemberTask = () => {
  const { teamId, memberId } = useParams();
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [task, setTask] = useState<IMemberTask>();

  const { data, isFetching } = useGetMemberDetailQuery({
    teamId: teamId as string,
    memberId: memberId as string,
  });

  const tableHead: ITableHead<IMemberTask>[] = [
    {
      label: "Name",
      accessor: "name",
      render: ({ name }) => {
        return capitalize(name);
      },
    },
    {
      label: "Description",
      accessor: "description",
      render: ({ description }) => {
        return capitalize(description);
      },
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
      action: (data: IMemberTask) => {
        setUpdateTaskModal(true);
        setTask(data);
      },
    },
  ];

  return (
    <>
      <div className="grid gap-y-4 ">
        <PageHeader title="Member Task" />
        <Table
          tableHeads={tableHead}
          dataTableSource={data?.data?.member?.tasks || []}
          loading={isFetching}
          showMenu
          menuOptions={menu}
          tableLoader={<TableLoading title=" Loading Member Task" />}
          tableEmptyState={<EmptyBar componentType="task" />}
        />
      </div>
      {updateTaskModal && (
        <UpdateMemberTask
          onClose={() => setUpdateTaskModal(false)}
          task={task as IMemberTask}
        />
      )}
    </>
  );
};

export default MemberTask;
