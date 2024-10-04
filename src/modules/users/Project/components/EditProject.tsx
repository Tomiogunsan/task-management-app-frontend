import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "@modules/users/validation";
import { ICreateProjectQuery } from "@services/interfaces/DTO/project";
import { IProject } from "@services/interfaces/response/project";
import { useEditProjectMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import ControlledInput from "shared/Input/ControlledInput";
import Modal from "shared/Modal";

type Props = {
  projectData: IProject | undefined;
  onClose: () => void;
};

const EditProject = ({ onClose, projectData }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: projectData?.name || "",
      description: projectData?.description || "",
    },
    resolver: yupResolver(createProjectSchema),
  });

  const [editProject, { isLoading }] = useEditProjectMutation();
  const projectId = projectData?._id as string;
  const handleEdit = async (data: ICreateProjectQuery) => {
    try {
      await editProject({
        projectId,
        data,
      });

      onClose();
      toastAlert.success("Project Edited Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} action={{ show: false }} header="Edit Project">
      <form className="grid gap-y-4 " onSubmit={handleSubmit(handleEdit)}>
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
          {isLoading ? <CircularProgress /> : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
};

export default EditProject;
