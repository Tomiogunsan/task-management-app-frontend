import { ITeams } from "@services/interfaces/response/team";
import { useGetTeamQuery } from "@services/team.service";
import { getDecodedJwt } from "helpers/auth";

import MessageCard from "shared/MessageCard";
import Search from "shared/Search";

type Props = {
  onClick: (_data: ITeams) => void;
};

const SideBar = ({ onClick }: Props) => {
  const user = getDecodedJwt();
  const teamId = user.user.team[0];
  const { data, isLoading } = useGetTeamQuery({ teamId });

  return (
    <div className="grid gap-y-[26px] fixed">
      <MessageCard
        name={user?.user?.name}
        role={user?.user?.role}
        avatar={user?.user?.name?.charAt(0)}
      />
      <Search placeholderText="Search for a team..." />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.data?.teams?.map((item) => (
          <MessageCard
            key={item._id}
            name={item.name}
            role={item.description}
            avatar={item.name?.charAt(0)}
            onClick={() => onClick(item)}
          />
        ))
      )}
    </div>
  );
};

export default SideBar;
