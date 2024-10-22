import { IMembers } from "@services/interfaces/response/team";
import { useGetTeamMembersQuery } from "@services/team.service";
import { formatDate } from "@utils/constant";
import { useParams } from "react-router-dom";
import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import TableLoading from "shared/tableLoading";

const Members = () => {
  const { teamId } = useParams();
  const { data , isFetching} = useGetTeamMembersQuery(teamId as string);
  console.log(data)

  const tableHead: ITableHead<IMembers>[] = [
    {
      label: "Name",
      accessor: "name",
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
    <div>
      <PageHeader title="Members" />
      <Table<IMembers>
        tableHeads={tableHead}
        dataTableSource={data?.data?.members || []}
        onRowClick={() => {}}
        loading={isFetching}
        tableLoader={<TableLoading title=" Loading Members" />}
      />
    </div>
  );
};

export default Members;
