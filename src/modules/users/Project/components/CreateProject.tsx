import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "@modules/users/validation";

import { ICreateProjectQuery } from "@services/interfaces/DTO/project";
import { useCreateProjectMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledInput from "shared/Input/ControlledInput";

const CreateProject = ({ onClose }: { onClose: () => void }) => {
  const { control, handleSubmit } = useForm<ICreateProjectQuery>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(createProjectSchema),
  });

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleCreate = async (data: ICreateProjectQuery) => {
    try {
      await createProject(data).unwrap();
      onClose();
      toastAlert.success("Project created successfully");
    } catch (error) {
      console.log(error);
      toastAlert.error("Something went wrong");
    }
  };
  return (
    <Drawer header="Create Project" onClose={onClose}>
      <form
        className="flex flex-col justify-between h-[668px]"
        onSubmit={handleSubmit(handleCreate)}
      >
        <div className="grid gap-y-8">
          <ControlledInput name="name" label="Name" control={control} />
          <ControlledInput
            name="description"
            label="Description"
            control={control}
            multiline
            rows={4}
          />
        </div>
        <Button type="submit">
          {isLoading ? <CircularProgress /> : "Create"}
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateProject;
