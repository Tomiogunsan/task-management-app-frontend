import {
  IDeleteProjectResponse,
  IProject,
} from "@services/interfaces/response/project";
import { useDeleteProjectMutation } from "@services/project.service";
import { toastAlert } from "@utils/toastConfig";
import Modal from "shared/Modal";

type Props = {
  projectData: IProject | undefined;
  onClose: () => void;
};
const DeleteProject = ({ onClose, projectData }: Props) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const handleDelete = async () => {
    try {
      const res = (await deleteProject(
        projectData?._id as string
      ).unwrap()) as unknown as IDeleteProjectResponse;

      onClose();
      toastAlert.success(res.message || "Project Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      action={{
        text: "Delete",
        color: "error",
        onClick: handleDelete,
        loading: isLoading,
      }}
      header="Delete Project"
    >
      <p>
        Are you sure you want to delete{" "}
        <span className="font-bold">{projectData?.name}</span> ?{" "}
      </p>
    </Modal>
  );
};

export default DeleteProject;
