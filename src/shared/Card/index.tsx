type Props = {
  title: string;
};

const Card = ({ title }: Props) => {
  return (
    <div className="bg-white rounde-md shadown-md border-[1px] border-white">
      <h1>{title}</h1>
    </div>
  );
};

export default Card;
