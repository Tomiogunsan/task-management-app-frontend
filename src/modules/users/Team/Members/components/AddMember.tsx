import { IAddMemberErrorResponse } from "@services/interfaces/response/team";
import { useAddMemberToTeamMutation } from "@services/team.service";
import { useGetUsersQuery } from "@services/user.service";
import { toastAlert } from "@utils/toastConfig";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledSelect from "shared/Select/ControlledSelect";

type Props = {
  onClose: () => void;
};

type IFormValues = {
  memberId: string;
};

const AddMember = ({ onClose }: Props) => {
  const { teamId } = useParams();
  const { control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      memberId: "",
    },
  });
  const { data, isFetching } = useGetUsersQuery(null);
  const [addMemberToTeam, { isLoading }] = useAddMemberToTeamMutation();
  const handleAddMember = async (data: IFormValues) => {
    const payload = {
      id: teamId as string,
      memberId: data?.memberId,
    };

    try {
      await addMemberToTeam(payload).unwrap();

      onClose();
      toastAlert.success("Member added successfully");
    } catch (error) {
      const { message } = error as unknown as IAddMemberErrorResponse;
      toastAlert.error(message || "Something went wrong");
    }
  };
  console.log('test')
  return (
    <Drawer onClose={onClose} header="Add a member">
      <form
        className="flex flex-col h-[650px] justify-between"
        onSubmit={handleSubmit(handleAddMember)}
      >
        <ControlledSelect
          control={control}
          name="memberId"
          label="Select a user"
          options={
            isFetching
              ? [
                  {
                    label: "Loading Users",
                    value: "",
                  },
                ]
              : (data?.data?.users || []).map((user) => ({
                  label: user.name,
                  value: user._id,
                }))
          }
          placeholder="Select a user"
        />
        <Button type="submit">
          {isLoading ? <CircularProgress /> : "Add"}
        </Button>
      </form>
    </Drawer>
  );
};

export default AddMember;
