import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskSchema } from "@modules/users/validation";
import { ICreateProjectTaskQuery } from "@services/interfaces/DTO/project";
import { ICreateProjectTaskErrorResponse } from "@services/interfaces/response/project";
import { useCreateProjectTaskMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledInput from "shared/Input/ControlledInput";

type Props = {
  onClose: () => void;
};

const CreateTask = ({ onClose }: Props) => {
  const { projectId } = useParams();
  const { control, handleSubmit } = useForm<
    Omit<ICreateProjectTaskQuery, "id">
  >({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(addTaskSchema),
  });
  const [createProjectTask, { isLoading }] = useCreateProjectTaskMutation();

  const handleCreateTask = async (
    data: Omit<ICreateProjectTaskQuery, "id">
  ) => {
    const payload = {
      id: projectId as string,
      name: data.name,
      description: data.description,
    };
    try {
      await createProjectTask(payload).unwrap();
      onClose();
      toastAlert.success("Task Created Successfully");
    } catch (error) {
      const { message } = error as unknown as ICreateProjectTaskErrorResponse;
      toastAlert.error(message || "Something went wrong");
    }
  };
  return (
    <Drawer onClose={onClose} header="Add a Task">
      <form
        className="flex flex-col justify-between h-[650px] "
        onSubmit={handleSubmit(handleCreateTask)}
      >
        <div className="grid gap-y-4">
          <ControlledInput name="name" label="Name" control={control} />
          <ControlledInput
            name="description"
            label="Description"
            control={control}
            multiline
            rows={3}
          />
        </div>

        <Button type="submit">
          {isLoading ? <CircularProgress /> : "Create"}
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateTask;
