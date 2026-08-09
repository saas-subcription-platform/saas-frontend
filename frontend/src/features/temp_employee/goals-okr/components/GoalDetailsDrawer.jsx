import { 
  X, 
  CalendarDays, 
  Target, 
  CheckCircle2 
} from "lucide-react";

import { useState } from "react";
import { toast } from "react-toastify";
import { updateGoal, deleteGoal } from "../services/goalService";


const GoalDetailsDrawer = ({ goal, isOpen, onClose, onGoalUpdated }) => {


  const [progress,setProgress] = useState(
    goal?.progress || 0
  );


  if (!isOpen || !goal) return null;



  const handleUpdate = async()=>{

    try{


      const updatedGoal = {

        title: goal.title,

        objective: goal.objective,

        category: goal.category,

        priority: goal.priority,

        deadline: goal.deadline,

        userId: goal.userId,

        companyId: goal.companyId,

        progress: Number(progress),

        status:
          Number(progress) === 100
          ? 2
          : Number(progress) > 0
          ? 1
          : 0

      };



      await updateGoal(
        goal.id,
        updatedGoal
      );



      toast.success(
        "Goal updated successfully"
      );


      if(onGoalUpdated)
      {
        onGoalUpdated();
      }



    }
    catch(error){

      console.error(error);

      toast.error(
        "Update failed"
      );

    }

  };





  const handleDelete = async()=>{

    try{

      await deleteGoal(goal.id);


      toast.success(
        "Goal deleted successfully"
      );


      onClose();


      if(onGoalUpdated)
      {
        onGoalUpdated();
      }


    }
    catch(error){

      console.error(error);

      toast.error(
        "Delete failed"
      );

    }

  };




  return (

    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">


      <div className="w-full max-w-md bg-white h-screen shadow-xl p-6 overflow-y-auto">



        {/* Header */}

        <div className="flex justify-between items-center border-b pb-4">


          <h2 className="text-2xl font-bold">
            Goal Details
          </h2>


          <button onClick={onClose}>
            <X/>
          </button>


        </div>




        <div className="mt-8">


          <h3 className="text-xl font-semibold">
            {goal.title}
          </h3>


          <p className="mt-2 text-gray-600">
            {goal.objective}
          </p>


        </div>





        {/* Progress Update */}

        <div className="mt-8">


          <label className="font-medium">
            Update Progress (%)
          </label>


          <input

            type="number"

            min="0"

            max="100"

            value={progress}

            onChange={(e)=>
              setProgress(e.target.value)
            }

            className="w-full border rounded-xl px-4 py-3 mt-2"

          />


        </div>





        <button

          onClick={handleUpdate}

          className="w-full mt-5 bg-primary text-white py-3 rounded-xl"

        >

          Update Goal

        </button>





        <button

          onClick={handleDelete}

          className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl"

        >

          Delete Goal

        </button>




        {/* Details */}

        <div className="space-y-5 mt-8">


          <div className="flex gap-3">

            <CalendarDays/>

            <div>

              <p className="text-sm text-gray-500">
                Deadline
              </p>

              <p>
                {new Date(goal.deadline)
                .toLocaleDateString()}
              </p>

            </div>

          </div>




          <div className="flex gap-3">

            <Target/>

            <div>

              <p className="text-sm text-gray-500">
                Priority
              </p>

              <p>
                {goal.priority}
              </p>

            </div>

          </div>




          <div className="flex gap-3">

            <CheckCircle2/>

            <div>

              <p className="text-sm text-gray-500">
                Status
              </p>

              <p>
                {goal.status}
              </p>

            </div>

          </div>



        </div>



      </div>


    </div>

  );
};


export default GoalDetailsDrawer;