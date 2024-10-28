import { IAssignProjectErrorResponse } from "@services/interfaces/response/team";
import { useGetProjectQuery } from "@services/project.service";
import { useAssignProjectMutation } from "@services/team.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledSelect from "shared/Select/ControlledSelect";

type Props = {
  onClose: () => void;
  teamId: string;
};

const AssignTeamProject = ({ onClose, teamId }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      project: "",
    },
  });
  const { data, isFetching } = useGetProjectQuery(null);
  const [assignProject, { isLoading }] = useAssignProjectMutation();
  const handleAssignProject = async (data: { project: string }) => {
    try {
      const payload = {
        teamId: teamId,
        projectId: data.project,
      };
      await assignProject(payload).unwrap();

      onClose();
      toastAlert.success("Project Assigned Successfully");
    } catch (error) {
      const { message } = error as unknown as IAssignProjectErrorResponse;
      toastAlert.error(message || "Something went wrong");
    }
  };
  return (
    <Drawer onClose={onClose} header="Assign Project To a Team">
      <div className="flex flex-col justify-between h-[650px]">
        <ControlledSelect
          name="project"
          label="Select a Project"
          placeholder="Select a Project"
          control={control}
          options={
            isFetching
              ? [
                  {
                    label: "Loading Projects....",
                    value: "",
                  },
                ]
              : (data?.data?.project || []).map((project) => ({
                  label: project?.name,
                  value: project?._id,
                }))
          }
        />
        <Button
          type="submit"
          onClick={() => handleSubmit(handleAssignProject)()}
        >
          {isLoading ? <CircularProgress /> : "Assign"}
        </Button>
      </div>
    </Drawer>
  );
};

export default AssignTeamProject;
