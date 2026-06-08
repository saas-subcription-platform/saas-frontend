import {useState} from "react";
import AdminLayout from "../../../components/common/layout/AdminLayout";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState ={
  name:"John Doe",
  email:"john@technova.com",
  mobile: "+91 9876543210",
  role:"Super Admin",
  department:"Administration",
  username:"john_admin",
  lastLogin:"07 June 2026",
  status:"Active",
};


const SettingsPage = () => {
  const[admin,setAdmin] = useState({...initialState});

  // const handleChange = () => {
  //   setAdmin(initialization);
  // }

const handleChange = (e) => {
  const {name,value} = e.target;
  setAdmin((prev) => ({
     ...prev,
     [name]:value,
  }));
};

const handleSave = () => {
  console.log("Saved Data: ",admin);
  toast.success("Changes saved successfully!");
};

const handleCancel=() => {
  setAdmin({...initialState});
  toast.info("Changes cancelled");
};
 return (
  <AdminLayout>
    <div>

      <ToastContainer position="top-right" autoClose={2000}/>
      <div className="text-center mb-12">
       <h2 className="text-4xl md:text-5xl font-bold text-dark">
        Settings
       </h2>

       <p className="mt-4 text-lg text-dark/70">
         Manage your profile,notifications,and  account settings.
       </p>

      </div>

      <div className="flex items-center gap-6 mb-10 border-b border-border pb-8">

         <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
          JD
         </div>

         <div>
          <h3 className="text-2xl font-bold text-dark">
            {admin.name}
          </h3>
          <p className="text-dark/70">{admin.role}</p>
         </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <input 
        name="name"
        value={admin.name}
        onChange={handleChange}
        className="border p-3 rounded-xl"
        placeholder="Full Name"
        />

        <input 
        name="email"
        value={admin.email}
        onChange={handleChange}
        className="border  p-3  rounded-xl"
        placeholder="Email"
        />
        <input
         name="mobile"
         value={admin.mobile}
         onChange={handleChange}
         className="border p-3 rounded-xl"
         placeholder="Mobile"
         />

         <input
          name="department"
          value={admin.department}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          placeholder="Department"
          />

      </div>

      <div className="mt-10 bg-background p-6 rounded-xl">
        <p><b>Username:</b>{admin.username}</p>
        <p><b>Last Login:</b>{admin.lastLogin}</p>
        <p><b>Status:</b>{admin.status}</p>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-5">
          Notification Management
        </h3>

        <div className="space-y-4">
        <label className="flex justify-between">
          Email Notifications
          <input type="checkbox" defaultChecked/>
        </label>

        <label className="flex justify-between">
          Renewal Alerts
          <input type="checkbox" defaultChecked />

        </label>

        </div>
      </div>


      <div className="flex gap-4 mt-10">
        <button 
          onClick={handleSave}
          className="bg-primary text-white px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>

          <button
            onClick={handleCancel}
            className="border px-6 py-3 rounded-xl"
            >
            Cancel
          </button>
          </div>
      </div>
    
  </AdminLayout>
 );
 };

 export default SettingsPage;
