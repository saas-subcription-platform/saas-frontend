const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
}) => {
  return (
    <div className=" bg-white border border-border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-dark/70">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {value}
          </h3>

          <p className="text-green-600 mt-2">
            {change}
          </p>
        </div>

        <Icon
          size={32}
          className="text-primary"
        />
      </div>
    </div>
  );
};

export default StatCard;