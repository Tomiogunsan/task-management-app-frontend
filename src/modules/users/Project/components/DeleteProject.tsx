import Modal from "shared/Modal";

const DeleteProject = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose} action={{ text: "Delete", color: "error" }}>
      DeleteProject
    </Modal>
  );
};

export default DeleteProject;
