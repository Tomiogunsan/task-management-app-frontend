import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center mt-[350px]">
      <CircularProgress />
    </div>
  );
};

export default Loader;
