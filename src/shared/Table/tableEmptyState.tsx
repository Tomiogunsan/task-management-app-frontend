import { MdHourglassEmpty } from "react-icons/md";

type IEmptyProp = {
  componentType?: "team" | "member" | "project" | "task";
};

const EmptyBar = ({ componentType }: IEmptyProp) => {
  const content = (() => {
    switch (componentType) {
      case "team":
        return <p> No Team Found</p>;
      case "member":
        return <p> No Member Found</p>;
      case "project":
        return <p> No Project Found</p>;
      case "task":
        return <p> No Task Found</p>;
      default:
        return "";
    }
  })();
  return (
    <div className="w-full flex flex-col items-center justify-center  gap-4 py-4">
      <MdHourglassEmpty size={130} className='text-[#bdbdbd]'/>
      <p className='text-lg   text-[#000]'>{content}</p>
    </div>
  );
};

export default EmptyBar;
