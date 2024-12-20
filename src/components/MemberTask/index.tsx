import UpdateMemberTask from "@modules/users/Team/Members/MemberTask/components/UpdateMemberTask";
import { IMemberTask } from "@services/interfaces/response/team";
import { useGetMemberDetailQuery } from "@services/team.service";
import { formatDate } from "@utils/constant";
import { capitalize } from "lodash";
import { useState } from "react";
import PageHeader from "shared/PageHeader";
import StatusBadge, { IStatusType } from "shared/StatusBadge";
import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import EmptyBar from "shared/Table/tableEmptyState";
import TableLoading from "shared/tableLoading";

const MemberTaskComponent = ({
  teamId,
  memberId,
}: {
  teamId: string;
  memberId: string;
}) => {
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [task, setTask] = useState<IMemberTask>();
  const [projectId, setProjectId] = useState("");

  const { data, isFetching } = useGetMemberDetailQuery({
    teamId: teamId as string,
    memberId: memberId as string,
  });

  console.log(data?.data?.member?.projects.toString());
  const project = data?.data?.member?.projects.toString();
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
        setProjectId(project as string);
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
          projectId={projectId}
        />
      )}
    </>
  );
};

export default MemberTaskComponent;
