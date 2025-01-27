const TitleAndDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full space-y-1">
      <h1 className="text-[#25324B] font-semibold">{title}</h1>
      <p className="text-[#7C8493] font-normal">{description}</p>
    </div>
  );
};

export default TitleAndDescription;
