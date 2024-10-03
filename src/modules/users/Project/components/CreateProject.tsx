import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "@modules/users/validation";
import { ICreateProjectSchema } from "@modules/users/validation/interface";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import Drawer from "shared/Drawer";
import ControlledInput from "shared/Input/ControlledInput";

const CreateProject = ({ onClose }: { onClose: () => void }) => {
  const { control, handleSubmit } = useForm<ICreateProjectSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(createProjectSchema),
  });

  const handleCreate = (data: ICreateProjectSchema) => {
    console.log(data);
  };
  return (
    <Drawer header="Create Project" action={{}} onClose={onClose}>
      <form
        className="flex flex-col justify-between h-[668px]"
        onSubmit={handleSubmit(handleCreate, (err) => console.log(err))}
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
        <Button type="submit">Create</Button>
      </form>
    </Drawer>
  );
};

export default CreateProject;
