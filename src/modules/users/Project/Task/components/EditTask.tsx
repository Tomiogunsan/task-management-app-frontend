import Modal from "shared/Modal";

type Props = {
  onClose: () => void;
};

const EditTask = ({ onClose }: Props) => {
  return (
    <Modal onClose={onClose} header="Edit Task">
      EditTask
    </Modal>
  );
};

export default EditTask;
