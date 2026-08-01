import { useState } from "react";
import { toast } from "react-toastify";
import { createGoal } from "../services/goalService";
import { getCurrentUser } from "../../services/userService";


const CreateGoalModal = ({ isOpen, onClose, onGoalCreated }) => {


  const [formData, setFormData] = useState({

    title: "",
    objective: "",
    category: "Learning",
    priority: 3,
    deadline: ""

  });



  if (!isOpen) return null;



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const currentUser = await getCurrentUser();


      const goalData = {


        title: formData.title,


        objective: formData.objective,


        category: formData.category,


        priority: Number(formData.priority),


        deadline: new Date(
          formData.deadline
        ).toISOString(),


        userId: currentUser.userId,


        companyId: currentUser.companyId,


        status: 0,


        progress: 0


      };



      await createGoal(goalData);



      toast.success("Goal created successfully!");



      if(onGoalCreated){

        onGoalCreated();

      }



      onClose();



    } catch(error){


      console.error(
        "Error creating goal:",
        error
      );


      toast.error(
        "Failed to create goal"
      );


    }


  };




  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl">


        <div className="flex justify-between items-center mb-6">


          <h2 className="text-2xl font-bold text-gray-800">
            Create New Goal
          </h2>


          <button
            onClick={onClose}
            className="bg-primary text-white px-5 py-2 rounded-xl"
          >
            ✕
          </button>


        </div>




        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >



          <div>

            <label className="block text-sm font-medium mb-2">
              Goal Title
            </label>


            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              required
              placeholder="Enter goal title"
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>





          <div>


            <label className="block text-sm font-medium mb-2">
              Objective
            </label>


            <textarea

              name="objective"

              value={formData.objective}

              onChange={handleChange}

              rows="3"

              required

              placeholder="Describe your objective"

              className="w-full border rounded-xl px-4 py-3"

            />


          </div>






          <div className="grid grid-cols-2 gap-4">


            <div>


              <label className="block text-sm font-medium mb-2">
                Category
              </label>


              <select

                name="category"

                value={formData.category}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option value="Learning">
                  Learning
                </option>


                <option value="Project">
                  Project
                </option>


                <option value="Performance">
                  Performance
                </option>


              </select>


            </div>





            <div>


              <label className="block text-sm font-medium mb-2">
                Priority
              </label>


              <select

                name="priority"

                value={formData.priority}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option value="3">
                  High
                </option>


                <option value="2">
                  Medium
                </option>


                <option value="1">
                  Low
                </option>


              </select>


            </div>


          </div>






          <div>


            <label className="block text-sm font-medium mb-2">
              Deadline
            </label>


            <input

              name="deadline"

              value={formData.deadline}

              onChange={handleChange}

              type="date"

              required

              className="w-full border rounded-xl px-4 py-3"

            />


          </div>






          <div className="flex justify-end gap-3 pt-4">


            <button

              type="button"

              onClick={onClose}

              className="px-5 py-2 border rounded-xl"

            >

              Cancel

            </button>





            <button

              type="submit"

              className="bg-primary text-white px-5 py-2 rounded-xl"

            >

              Save Goal

            </button>


          </div>




        </form>


      </div>


    </div>

  );

};


export default CreateGoalModal;