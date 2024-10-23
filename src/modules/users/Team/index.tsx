import { TeamPagePath } from "@constants/path";
import { ITeams } from "@services/interfaces/response/team";
import { useGetTeamQuery } from "@services/team.service";
import { useNavigate } from "react-router-dom";
import PageHeader from "shared/PageHeader";
import { useState } from "react";
import Table from "shared/Table";

import { ITableHead } from "shared/Table/interface";
import TableLoading from "shared/tableLoading";
import AddTeam from "./components/AddTeam";
import { capitalize, formatDate } from "@utils/constant";

const Team = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const tableHead: ITableHead<ITeams>[] = [
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
    },
    {
      label: "Project",
      accessor: "projects",
      render: ({ projects }) => {
        return projects?.name || "--";
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
  ];
  const { data, isFetching } = useGetTeamQuery(null);
 
  return (
    <>
      <div className=" grid gap-y-8 pt-4">
        <PageHeader
          title="Team"
          actions={<div onClick={() => setOpenDrawer(true)}>Add Team</div>}
        />
        <Table<ITeams>
          tableHeads={tableHead}
          dataTableSource={data?.data?.teams || []}
          onRowClick={({ _id: id }) => navigate(TeamPagePath.teamDetails(id))}
          loading={isFetching}
          tableLoader={<TableLoading title=" Loading Teams" />}
        />
      </div>
      {openDrawer && <AddTeam onClose={() => setOpenDrawer(false)} />}
    </>
  );
};

export default Team;
