import { useGetTeamQuery } from "@services/team.service";
import { useForm } from "react-hook-form";
import Drawer from "shared/Drawer";
import ControlledSelect from "shared/Select/ControlledSelect";

type Props = {
  onClose: () => void;
};

const AssignProject = ({ onClose }: Props) => {
  const { data, isFetching } = useGetTeamQuery(null);
  const { control } = useForm({
    defaultValues: {
      team: "",
    },
  });
  return (
    <Drawer onClose={onClose} header="Assign Project">
      <div className="">
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
                  label: team.name,
                  value: team._id,
                }))
          }
        />
      </div>
    </Drawer>
  );
};

export default AssignProject;
