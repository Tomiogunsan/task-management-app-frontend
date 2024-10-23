import { IMembers } from "@services/interfaces/response/team";
import { useGetTeamMembersQuery } from "@services/team.service";
import { capitalize, formatDate } from "@utils/constant";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import EmptyBar from "shared/Table/tableEmptyState";
import TableLoading from "shared/tableLoading";
import AddMember from "./components/AddMember";

const Members = () => {
  const { teamId } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data , isFetching} = useGetTeamMembersQuery(teamId as string);
  console.log(data)

  const tableHead: ITableHead<IMembers>[] = [
    {
      label: "Name",
      accessor: "name",
      render: ({name}) => {
        return capitalize(name)
      }
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
          onRowClick={() => {}}
          loading={isFetching}
          tableLoader={<TableLoading title=" Loading Members" />}
          tableEmptyState={<EmptyBar componentType="member" />}
        />
      </div>
      {openDrawer && <AddMember onClose={() => setOpenDrawer(false)}/>}
    </>
  );
};

export default Members;
