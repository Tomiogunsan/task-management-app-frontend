import { ITask } from "@services/interfaces/response/project";
import { useDeleteTaskMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import { useParams } from "react-router-dom";
import Modal from "shared/Modal";

type Props = {
  onClose: () => void;
  task: ITask;
};

const DeleteTask = ({ onClose, task }: Props) => {
  const { projectId } = useParams();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const handleDelete = async () => {
    const payload = {
      projectId: projectId as string,
      taskId: task?._id,
    };
    await deleteTask(payload).unwrap();
    onClose();
    toastAlert.success("Task Deleted Successfully");
  };
  return (
    <Modal
      onClose={onClose}
      header="Delete Task"
      action={{
        text: "Delete",
        color: "error",
        onClick: handleDelete,
        loading: isLoading,
      }}
    >
      <p>
        Are you sure you want to delete{" "}
        <span className="font-bold">{task?.name}</span> ?{" "}
      </p>
    </Modal>
  );
};

export default DeleteTask;
