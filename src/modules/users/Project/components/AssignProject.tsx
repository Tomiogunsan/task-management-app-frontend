import { IProject } from "@services/interfaces/response/project";
import { IAssignProjectErrorResponse } from "@services/interfaces/response/team";
import {
  useAssignProjectMutation,
  useGetTeamQuery,
} from "@services/team.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledSelect from "shared/Select/ControlledSelect";

type Props = {
  onClose: () => void;
  projectData: IProject;
};

const AssignProject = ({ onClose, projectData }: Props) => {
  const { data, isFetching } = useGetTeamQuery({ teamId: "" });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      team: "",
    },
  });
  const [assignProject, { isLoading }] = useAssignProjectMutation();

  const handleAssignProject = async (data: { team: string }) => {
    try {
      const payload = {
        teamId: data?.team,
        projectId: projectData._id,
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
    <Drawer onClose={onClose} header="Assign Project">
      <div className="flex flex-col justify-between h-[650px]">
        <ControlledSelect
          name="team"
          label="Select a Team"
          placeholder="Select a Team"
          control={control}
          options={
            isFetching
              ? [
                  {
                    label: "Loading Teams....",
                    value: "",
                  },
                ]
              : (data?.data?.teams || []).map((team) => ({
                  label: team?.name,
                  value: team?._id,
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

export default AssignProject;
