import {
  IAssignTaskToMemberErrorResponse,
  IMembers,
} from "@services/interfaces/response/team";
import { useGetAllProjectTaskQuery } from "@services/project.service";
import { useAssignTaskToMemberMutation } from "@services/team.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledSelect from "shared/Select/ControlledSelect";

type Props = {
  onClose: () => void;
  memberData: IMembers;
};

const AssignMemberToTask = ({ onClose, memberData }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      task: "",
    },
  });

  const [assignTaskToMember, { isLoading }] = useAssignTaskToMemberMutation();
  const { data, isFetching } = useGetAllProjectTaskQuery(
    memberData?.projects?._id as string
  );

  const handleAssignTask = async (data: { task: string }) => {
    try {
      const payload = {
        projectId: memberData?.projects?._id as string,
        taskId: data.task,
        userId: memberData?._id as string,
      };
      await assignTaskToMember(payload).unwrap();

      onClose();
      toastAlert.success("Task assigned successfully");
    } catch (error) {
      const { message } = error as IAssignTaskToMemberErrorResponse;
        onClose();
      toastAlert.error(message || "Something went wrong");
    }
  };

  return (
    <Drawer onClose={onClose} header="Assign Task">
      <div className="flex flex-col justify-between h-[650px]">
        <ControlledSelect
          name="task"
          label="Task"
          placeholder="Select a Task"
          control={control}
          options={
            isFetching
              ? [
                  {
                    label: "Loading Tasks....",
                    value: "",
                  },
                ]
              : (data?.data?.tasks || []).map((task) => ({
                  label: task?.name,
                  value: task?._id,
                }))
          }
        />
        <Button type="submit" onClick={() => handleSubmit(handleAssignTask)()}>
          {isLoading ? <CircularProgress /> : "Assign"}
        </Button>
      </div>
    </Drawer>
  );
};

export default AssignMemberToTask;
