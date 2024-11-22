import {
  IMemberTask,
  IUpdateMemberTaskErrorResponse,
} from "@services/interfaces/response/team";
import { useUpdateMemberTaskMutation } from "@services/team.service";
import { toastAlert } from "@utils/toastConfig";
import Modal from "shared/Modal";

type Props = {
  onClose: () => void;
  task: IMemberTask;
  projectId: string 
};

const UpdateMemberTask = ({ onClose, task, projectId }: Props) => {
  const taskId = task?._id;
  // const projectId = task?.project.map((project) => project?._id).toString();
  const [updateMemberTask] = useUpdateMemberTaskMutation();

  const handleUpdate = async () => {
    try {
      const payload = {
        projectId,
        taskId,
      };
      await updateMemberTask(payload);
      onClose();
      toastAlert.success("Task updated successfully");
    } catch (error) {
      const { message } = error as IUpdateMemberTaskErrorResponse;
      toastAlert.error(message || "Something went wrong");
    }
  };
  return (
    <Modal
      onClose={onClose}
      header="Update Task"
      action={{
        text: "Update",
        onClick: handleUpdate,
      }}
    >
      Are you sure you want to update <strong>{task?.name}</strong>?
    </Modal>
  );
};

export default UpdateMemberTask;
