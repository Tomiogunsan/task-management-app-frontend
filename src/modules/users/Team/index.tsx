import { useGetTeamQuery } from "@services/team.service";
import Table from "shared/Table";

const Team = () => {
  const tableHead = [
    {
      label: "Name",
      accessor: "name",
    },
  ];
  const { data } = useGetTeamQuery(null);
  console.log(data);
  return (
    <div >
      <Table heads={tableHead} body={data?.teams || []} />
    </div>
  );
};

export default Team;
