import GoalCard from "./GoalCard";


const GoalsList = ({ goals, onViewGoal }) => {

  return (
    <div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        My Goals
      </h2>


      {
        goals.length === 0 ? (

          <p className="text-gray-500">
            No goals available
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {
              goals.map((goal) => (

                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onView={onViewGoal}
                />

              ))
            }

          </div>

        )
      }


    </div>
  );
};


export default GoalsList;