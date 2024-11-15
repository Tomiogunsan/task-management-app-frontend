import { MessagePagePath } from "@constants/path";
import { useGetTeamQuery } from "@services/team.service";
import { getDecodedJwt } from "helpers/auth";
import { useNavigate } from "react-router-dom";

import MessageCard from "shared/MessageCard";
import Search from "shared/Search";

type Props = {
  onClick: (_id: string) => void;
};

const SideBar = ({ onClick }: Props) => {
  const { data, isLoading } = useGetTeamQuery(null);

  const user = getDecodedJwt();
  return (
    <div className="grid gap-y-[26px]">
      <MessageCard
        name={user?.user?.name}
        role={user?.user?.role}
        avatar={<p>{user?.user?.name?.charAt(0)}</p>}
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
            avatar={<p>{item.name?.charAt(0)}</p>}
            onClick={() => onClick(item._id)}
          />
        ))
      )}
    </div>
  );
};

export default SideBar;
