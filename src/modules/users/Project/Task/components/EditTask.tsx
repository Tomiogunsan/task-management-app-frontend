import { ICreateProjectTaskQuery } from "@services/interfaces/DTO/project";
import { ITask } from "@services/interfaces/response/project";
import { useEditTaskMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import ControlledInput from "shared/Input/ControlledInput";
import Modal from "shared/Modal";

type Props = {
  onClose: () => void;
  task: ITask;
};

const EditTask = ({ onClose, task }: Props) => {
  const { projectId } = useParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: task.name || "",
      description: task.description || "",
    },
  });
  const [editTask, { isLoading }] = useEditTaskMutation();

  const handleEdit = async (data: Omit<ICreateProjectTaskQuery, "id">) => {
    try {
      const payload = {
        projectId: projectId as string,
        taskId: task?._id,
        name: data.name,
        description: data.description,
      };
      await editTask(payload).unwrap();
      onClose();
      toastAlert.success("Task Edited Successfully");
    } catch (error) {
      console.log(error);
      toastAlert.error("Something went wrong");
    }
  };
  return (
    <Modal onClose={onClose} header="Edit Task" action={{ show: false }}>
      <div className="grid gap-y-4">
        <ControlledInput name="name" label="Name" control={control} />
        <ControlledInput
          name="description"
          label="Description"
          control={control}
          multiline
          rows={3}
        />
        <Button
          type="submit"
          onClick={() => handleSubmit(handleEdit)()}
          className="w-full"
        >
          {isLoading ? <CircularProgress /> : "Save Changes"}
        </Button>
      </div>
    </Modal>
  );
};

export default EditTask;
