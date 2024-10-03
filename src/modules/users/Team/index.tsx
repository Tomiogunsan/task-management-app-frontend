import { TeamPagePath } from "@constants/path";
import { ITeams } from "@services/interfaces/response/team";
import { useGetTeamQuery } from "@services/team.service";
import { useNavigate } from "react-router-dom";
import PageHeader from "shared/PageHeader";

import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import TableLoading from "shared/tableLoading";

const Team = () => {
  const navigate = useNavigate();
  const tableHead: ITableHead<ITeams>[] = [
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Project",
      accessor: "projects",
      render: ({ projects }) => {
        return projects.name;
      },
    },
  ];
  const { data , isFetching } = useGetTeamQuery(null);
  console.log(data);
  return (
    <div className=" grid gap-y-8 pt-4">
      <PageHeader title="Team" />
      <Table<ITeams>
        tableHeads={tableHead}
        dataTableSource={data?.data?.teams || []}
        onRowClick={({ _id: id }) => navigate(TeamPagePath.id(id))}
        loading={isFetching}
        tableLoader={<TableLoading title=" Loading Teams" />}
      />
    </div>
  );
};

export default Team;
