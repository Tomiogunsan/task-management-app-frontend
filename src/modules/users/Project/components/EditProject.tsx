import Modal from "shared/Modal";

const EditProject = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose} action={{ text: "Save Changes" }}>
      EditProject
    </Modal>
  );
};

export default EditProject;
