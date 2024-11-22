import MemberTaskComponent from "@components/MemberTask";
import { getDecodedJwt } from "helpers/auth";

const TeamMemberTask = () => {
  const user = getDecodedJwt();
  const teamId = user?.user?.team.toString();
  const memberId = user?.user?.id;
  return (
    <MemberTaskComponent
      teamId={teamId as string}
      memberId={memberId as string}
    />
  );
};

export default TeamMemberTask;
