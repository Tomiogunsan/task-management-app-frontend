import { useParams } from "react-router-dom";

import MemberTaskComponent from "@components/MemberTask";

const AdminMemberTask = () => {
  const { teamId, memberId } = useParams();

  return (
    <MemberTaskComponent
      teamId={teamId as string}
      memberId={memberId as string}
    />
  );
};

export default AdminMemberTask;
