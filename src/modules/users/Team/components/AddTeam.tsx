import { yupResolver } from "@hookform/resolvers/yup";
import { addTeamSchema } from "@modules/users/validation";
import { IAddTeamQuery } from "@services/interfaces/DTO/team";
import { useAddTeamMutation } from "@services/team.service";
import { toastAlert } from "@utils/toastConfig";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import CircularProgress from "shared/CircularProgress";
import Drawer from "shared/Drawer";
import ControlledInput from "shared/Input/ControlledInput";

type Props = {
  onClose: () => void;
};

const AddTeam = ({ onClose }: Props) => {
  const { control, handleSubmit } = useForm<IAddTeamQuery>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(addTeamSchema),
  });

  const [addTeam, {isLoading}] = useAddTeamMutation();

  const handleAddTeam = async (data: IAddTeamQuery) => {
    console.log(data);
    try {
    await addTeam(data).unwrap();
    onClose();
     toastAlert.success("Team added successfully");
    } catch (error) {
        console.log(error)
        toastAlert.error("Something went wrong");
    }
  };
  return (
    <Drawer onClose={onClose} header="Add a Team" action={{ show: false }}>
      <form
        className="flex flex-col justify-between h-[660px]"
        onSubmit={handleSubmit(handleAddTeam)}
      >
        <div className="grid gap-y-4">
          <ControlledInput name="name" label="Name" control={control} />
          <ControlledInput
            name="description"
            label="Description"
            multiline
            rows={3}
            control={control}
          />
        </div>

        <Button type="submit">
            {isLoading ? <CircularProgress size={20} />: 'Create'}
        </Button>
      </form>
    </Drawer>
  );
};

export default AddTeam;
