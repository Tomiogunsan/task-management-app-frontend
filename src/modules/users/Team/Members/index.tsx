import { IMembers } from "@services/interfaces/response/team";
import { useGetTeamMembersQuery } from "@services/team.service";
import { capitalize, formatDate } from "@utils/constant";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import EmptyBar from "shared/Table/tableEmptyState";
import TableLoading from "shared/tableLoading";
import AddMember from "./components/AddMember";

import AssignMemberToTask from "./components/AssignMemberToTask";
import { TeamPagePath } from "@constants/path";

const Members = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [memberData, setMemberData] = useState<IMembers>();
  const [openAssignTask, setOpenAssignTask] = useState(false);

  const { data, isFetching } = useGetTeamMembersQuery(teamId as string);

  const tableHead: ITableHead<IMembers>[] = [
    {
      label: "Name",
      accessor: "name",
      render: ({ name }) => {
        return capitalize(name);
      },
    },
    {
      label: "Email",
      accessor: "email",
    },
    {
      label: "Date Created",
      accessor: "createdAt",
      render: ({ createdAt }) => {
        return !createdAt ? "--" : formatDate({ date: createdAt, time: true });
      },
    },
  ];

  const menu = [
    {
      menuTitle: "Assign Task",
      action: (data: IMembers) => {
        setMemberData(data);
        setOpenAssignTask(true);
      },
    },
  ];
  return (
    <>
      <div className="grid gap-y-4">
        <PageHeader
          title="Members"
          actions={<div onClick={() => setOpenDrawer(true)}>Add Member</div>}
        />
        <Table<IMembers>
          tableHeads={tableHead}
          dataTableSource={data?.data?.members || []}
          onRowClick={({ _id: id }) => {
            navigate(TeamPagePath.teamMemberDetails(teamId as string, id));
          }}
          loading={isFetching}
          menuOptions={menu}
          showMenu
          tableLoader={<TableLoading title=" Loading Members" />}
          tableEmptyState={<EmptyBar componentType="member" />}
        />
      </div>
      {openDrawer && <AddMember onClose={() => setOpenDrawer(false)} />}
      {openAssignTask && (
        <AssignMemberToTask
          onClose={() => setOpenAssignTask(false)}
          memberData={memberData as IMembers}
        />
      )}
    </>
  );
};

export default Members;
