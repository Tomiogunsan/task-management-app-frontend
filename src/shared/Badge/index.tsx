import { twMerge } from "tailwind-merge";

const Badge = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div
      className={twMerge(
        "w-[45px] h-[45px] rounded-full bg-slate-200 uppercase text-center pt-2 text-lg font-semibold text-[#818187]",
        className
      )}
    >
      {name}
    </div>
  );
};

export default Badge;
